import type {
  CartMenuItemsByUserVariables,
  Query,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useState } from 'react'

export const QUERY = gql`
  query CartMenuItemsByUser($userId: Int!) {
    cartMenuItemsByUser: cartMenuItemsByUser(userId: $userId) {
      id
      userId
      menuItem {
        id
        name
        description
        price
        logo
      }
      quantity

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

export const Success = ({ user }: CellSuccessProps<Query>) => {
  const [cart, setCart] = useState(user.cartMenuItem || [])

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedCart = [...cart]
    updatedCart[index] = {
      ...updatedCart[index],
      quantity: newQuantity,
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
    <div className="border border-gray-300 p-4">
      {cart.map((cartItem, i) => (
        <div key={i} className="mb-4 flex items-center">
          <img
            src={cartItem.menuItem.logo}
            alt={cartItem.menuItem.name}
            className="mr-4 h-20 w-20"
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
              className="w-16 appearance-none bg-gray-100 px-2 py-1 text-center"
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
      <div className="mt-4 flex justify-end">
        <p className="text-xl font-bold">
          Total Price: {calculateTotalPrice()}
        </p>
      </div>
    </div>
  )
}
