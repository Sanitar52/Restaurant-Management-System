import type {
  Query,
} from 'types/graphql'
import { type CellSuccessProps, type CellFailureProps, useMutation } from '@redwoodjs/web'
import { useState } from 'react'
import { toast } from '@redwoodjs/web/dist/toast'
import { UpdateCartMenuItemInput } from 'types/graphql'

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
  const [updateCartMenuItem] = useMutation(UPDATE_CART_MENU_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Cart item updated');
    },
    onError: (error) => {
      toast.error('Failed to update cart item');
      console.error(error);
    },
  });
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
  const updateAllCartItems = async () => {
    for (const cartItem of cart) {
      const Id: number = cartItem.id as number;
      await handleUpdateCartItem(Id, {
            quantity: cartItem.quantity as number,
            orderPrice: cartItem.menuItem.price * cartItem.quantity,
            inCart: cartItem.quantity > 0 ? true : false,
            menuItemId: cartItem.menuItem.id as number,
            userId: me?.id as number,
            orderId: cartItem.orderId as number,

      });
    }
  };






  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedCart = [...cart]
    updatedCart[index] = {
      ...updatedCart[index],
      quantity: newQuantity <= 0 ? 0 : newQuantity,
    }
    setCart(updatedCart)
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
        <div key={i} className="mb-4 flex items-center">
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
onClick={
  async () => {
    await updateAllCartItems()
  }

}>Satın Al</button>
</div>

    </div>
  )
}
