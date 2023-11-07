
import { type CellSuccessProps, type CellFailureProps, useMutation } from '@redwoodjs/web'
import { useRef, useState } from 'react'
import { toast } from '@redwoodjs/web/dist/toast'
import { Query, UpdateCartMenuItemInput } from 'types/graphql'
import { CreateOrderInput } from 'types/graphql'
import { Dialog } from '@reach/dialog';
import VisuallyHidden from '@reach/visually-hidden';
import { useAuth } from 'src/auth'
import { QUERY as HeaderCartsCellQuery } from 'src/components/HeaderCartsCell'
export const QUERY = gql`
  query {
    me {
      cartMenuItem {
        menuItem {
          category
          description
          id
          logo
          name
          price
        }
        quantity
        orderPrice
        inCart
        id
      }
    }
  }
`
const UPDATE_CART_MENU_ITEM_MUTATION = gql`
  mutation UpdateCartMenuItemMutation($id: Int!, $input: UpdateCartMenuItemInput!) {
    updateCartMenuItem(id: $id, input: $input) {
      id
      quantity
      inCart
    }
  }
`
const DELETE_CART_MENU_ITEM_MUTATION = gql`
  mutation DeleteCartMenuItemMutation($id: Int!) {
    deleteCartMenuItem(id: $id) {
      id
    }
  }
`

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrderMutation($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
    }
  }
`


export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div className="flex h-40 items-center justify-center">
    <p className="text-xl">Empty</p>
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div className="flex h-40 items-center justify-center text-red-500">
    <p className="text-xl">Error: {error?.message}</p>
  </div>
)

export const Success = ({ me }: CellSuccessProps<Query>) => {
  const [cart, setCart] = useState(me?.cartMenuItem || [])
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const cartItemIdToDelete = useRef<number | null>(null);
  const {currentUser} = useAuth()

  const [updateCartMenuItem] = useMutation(UPDATE_CART_MENU_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Cart item updated');
    },
    onError: (error) => {
      toast.error('Failed to update cart item');
      console.error(error);
    },
  });
  const [deleteCartMenuItem] = useMutation(DELETE_CART_MENU_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Cart item deleted');
    },
    refetchQueries:[{query:HeaderCartsCellQuery}],
    awaitRefetchQueries: true,

    onError: (error) => {
      toast.error('Failed to delete cart item');
      console.error(error);
    },
  });
  const handleDeleteCartItem = (cartItemId: number, buying: boolean) => {
    // Store the cart item ID to be deleted in the ref
    cartItemIdToDelete.current = cartItemId;
    // Open the confirmation dialog
    if(buying){
      alert('Siparişiniz alındı');
    }
    else {setConfirmDialogOpen(true);}

  };

  const handleConfirmDelete = async (buying: boolean) => {
    try {
      if (buying) {
        cart.forEach(async (cartItem) => await deleteCartMenuItem({
          variables: {
            id: cartItem.id,
          },
          }))
      }
      else if (cartItemIdToDelete.current !== null) {
        const id = cartItemIdToDelete.current as number;
        await deleteCartMenuItem({
          variables: {
            id: id,
          },
        });







        // Manually update the cart data by filtering out the deleted item
        setCart((prevCart) =>
          prevCart.filter((cartItem) => cartItem.id !== id)
        );

        // Reset the cartItemIdToDelete ref
        cartItemIdToDelete.current = null;
        // Close the confirmation dialog
        setConfirmDialogOpen(false);
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };
  const handleUpdateCartItem = async (cartItemId: number, input: UpdateCartMenuItemInput) => {
    console.log('cartItemId:', cartItemId);
    try {
      const id = cartItemId as number
      const { data } = await updateCartMenuItem({
        variables: {
          id: id,
          input: input,
        },
      });

      // Handle the updated cart item data if needed.
      console.log('Updated cart item:', data.updateCartMenuItem);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };
  const handleOrderCreate = async () => {
    try {
      console.log(me)
      const id = currentUser?.id as number;
      const { data } = await createOrder({
        variables: {
          input: {
            userId: id,
            status: 'PENDING',
            total: calculateTotalPrice(),
            cartMenuItemIds: cart.map((cartItem) => cartItem.id) as number[],
          },
        },
      });

      // Handle the created order data if needed.
      console.log('Created order:', data.createOrder);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  }
  const [createOrder] = useMutation(CREATE_ORDER_MUTATION, {
    onCompleted: () => {
      toast.success('Order created');
    },
    onError: (error) => {
      toast.error('Failed to create order');
      console.error(error);
    },
  });







  const handleQuantityChange = async (index: number, newQuantity: number) => {
    const updatedCart = [...cart]
    updatedCart[index] = {
      ...updatedCart[index],
      quantity: newQuantity <= 0 ? 0 : newQuantity !== null ? newQuantity : isNaN(newQuantity) ? 0 : newQuantity,
      orderPrice: updatedCart[index].menuItem.price * newQuantity,
      inCart: newQuantity > 0 ? true : false,
    }

    setCart(updatedCart)
    console.log(updatedCart)

    const Id: number = updatedCart[index].id as number;
    console.log(Id)

    await handleUpdateCartItem(Id, {
      quantity: updatedCart[index].quantity as number,
      orderPrice: updatedCart[index].menuItem.price * updatedCart[index].quantity,
      inCart: updatedCart[index].quantity > 0 ? true : false,
      menuItemId: updatedCart[index].menuItem.id as number,
      userId: me?.id as number,
      orderId: updatedCart[index].orderId as number,


    }

    );


    if (newQuantity <= 0) {
      handleDeleteCartItem(updatedCart[index].id as number, false)
    }


  }

  const calculateTotalPrice = () => {
    let totalPrice = 0
    cart.forEach((cartItem) => {
      totalPrice += cartItem.menuItem.price * cartItem.quantity
    })
    return totalPrice
  }



  return (
    <div className="border border-gray-600 p-4">
      {cart.map((cartItem, i) => (

        <div key={i} className="m b-4 flex items-center">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-4 text-red-600 cursor-pointer hover:text-red-800 transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-360 active:scale-100 active:rotate-0 active:duration-150 active:ease-in-out active:transition "
            fill="none"
            viewBox="0 0 18 20"
            stroke="currentColor"
            onClick={() => handleDeleteCartItem(cartItem.id as number, false)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
          </svg>


          <img
            src={cartItem.menuItem.logo}
            alt={cartItem.menuItem.name}
            className="mr-4 h-28 w-28"
          />
          <div className="flex flex-1 flex-col">
            <p className="text-xl font-bold">{cartItem.menuItem.name}</p>
            <p>{cartItem.menuItem.description}</p>
          </div>
          <div className="ml-8 flex items-center">
            <button
              className="mr-1 rounded-full bg-gray-200 px-2 py-1"
              onClick={() => handleQuantityChange(i, cartItem.quantity - 1)}
            >
              -
            </button>
            <input
              type="number"
              className="w-20 appearance-none bg-gray-100 px-2 py-1 text-center"
              value={cartItem.quantity}
              min="1"
              onChange={(e) =>
                handleQuantityChange(i, parseInt(e.target.value))
              }
            />
            <button
              className="ml-1 rounded-full bg-gray-200 px-2 py-1"
              onClick={() => handleQuantityChange(i, cartItem.quantity + 1)}
            >
              +
            </button>
          </div>
          <div className="ml-8">
            <p className="text-xl">{cartItem.quantity}</p>
            <p>{cartItem.menuItem.price}</p>
          </div>
        </div>
      ))}
      <div className="mt-4 flex flex-col items-end">
        <p className="text-xl font-bold mb-4">
          Total Price: {calculateTotalPrice()}
        </p>
        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => {
            alert('Siparişiniz alındı');
            handleOrderCreate();
            cart.forEach((cartItem) => handleConfirmDelete(true as boolean))
              setCart([])
          }}>Satın Al</button>
      </div>
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
        onClick={() => handleConfirmDelete(false)}
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
