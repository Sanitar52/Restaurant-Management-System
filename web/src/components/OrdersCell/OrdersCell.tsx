import type { Query } from 'types/graphql'
import { type CellSuccessProps, type CellFailureProps, useMutation } from '@redwoodjs/web'
import { useRef, useState } from 'react'
import { toast } from '@redwoodjs/web/dist/toast'
import { Dialog } from '@reach/dialog'

export const QUERY = gql`
  query OrdersQuery {
    orders {
      id
      user {
        id
        name
        email
      }
      total
      status
      cartMenuItems {
        id
        quantity
        menuItem {
          id
          name
          description
          price
        }
      }

    }
  }
`
const DELETE_ORDER_MUTATION = gql`
  mutation DeleteOrderMutation($id: Int!) {
    deleteOrder(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ orders }: CellSuccessProps<Query>) => {
  const [order, setOrder] = useState(orders? [] : []);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const orderIdToDelete = useRef<number | null>(null);


  const [deleteOrder] = useMutation(DELETE_ORDER_MUTATION, {
    onCompleted: () => {
      toast.success('Order deleted');
    },
    awaitRefetchQueries: true,
    refetchQueries: [{ query: QUERY }],
    onError: (error) => {
      toast.error('Failed to delete Order');
      console.error(error);
    },
  });

  const handleDeleteOrder = (id: number) => {
    orderIdToDelete.current = id;
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (orderIdToDelete.current !== null) {
        const id = orderIdToDelete.current as number;
        await deleteOrder({
          variables: {
            id: id,
          },
        });

        // Manually update the cart data by filtering out the deleted item
        setOrder((prevOrder) =>
          prevOrder.filter((order) => order.id !== id)
        );

        // Reset the cartItemIdToDelete ref
        orderIdToDelete.current = null;
        // Close the confirmation dialog
        setConfirmDialogOpen(false);
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };




  return (
    <div className="border border-gray-200 rounded-3xl p-4">
      {orders.map((order, i) => (

        <div key={i} className="m b-4 flex items-center">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-4 text-red-600 cursor-pointer hover:text-red-800 transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-360 active:scale-100 active:rotate-0 active:duration-150 active:ease-in-out active:transition "
            fill="none"
            viewBox="0 0 18 20"
            stroke="currentColor"
            onClick={() => handleDeleteOrder(order.id as number)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-green-500  cursor-pointer hover:text-green-800 transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-360 active:scale-100 active:rotate-0 active:duration-150 active:ease-in-out active:transition "
            aria-hidden="true"
            fill="none"
            viewBox="0 0 16 12"
            stroke="currentColor"
            onClick={() => handleDeleteOrder(order.id as number)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
          </svg>


          <img
            src={order?.cartMenuItems[i]?.menuItem?.logo}
            alt={order?.cartMenuItems[i]?.menuItem?.name}
            className="mr-4 h-28 w-28"
          />
          <div className="flex flex-1 flex-col">
            <p className="text-xl font-bold">{order?.user?.email}</p>
            <p>{order?.status}</p>
          </div>
          <div className="ml-8">
            <p className="text-xl">{order?.total}</p>
            <p>{order?.total}</p>
          </div>
          <div className="ml-24">
            <p className="text-xl">Toplam: {order?.total}TL</p>
          </div>
        </div>
      ))}
      {/* Confirmation Dialog */}
      <Dialog
  isOpen={isConfirmDialogOpen}
  onDismiss={() => setConfirmDialogOpen(false)}
  className="fixed inset-0 flex items-center justify-center"
  style={{ backdropFilter: 'blur(2px)' }}
>
  <div className="bg-white p-4 rounded-lg text-center">
    <h2 className="text-lg font-semibold">Onaylama</h2>
    <p className="text-gray-700 my-4">Silmek istediğinize emin misiniz?</p>
    <div className="flex justify-center space-x-4">
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={handleConfirmDelete}
      >
        Evet
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-red-300"
        onClick={() => setConfirmDialogOpen(false)}
      >
        Hayır
      </button>
    </div>
  </div>
</Dialog>

    </div>
  )
}
