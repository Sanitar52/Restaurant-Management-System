import { Toaster, toast } from "@redwoodjs/web/dist/toast";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "src/auth";
import { useMutation } from '@redwoodjs/web'
import { QUERY as HeaderCartsCellQuery } from 'src/components/HeaderCartsCell'
import Spinner from "../Spinner/Spinner";
interface Props {
  menuItem: {
    category: string;
    description: string;
    id: number;
    restaurantCode: number;
    logo: string;
    name: string;
    price: number;
    quantity: number;
  };
}
const createCartMenuItem = gql `mutation MyMutation($input: CreateCartMenuItemInput!) {
  createCartMenuItem(input: $input) {
    menuItemId
    quantity
  }
}`
const MenuItem = ({ menuItem }: Props) => {
  useEffect (() => {
    const startTime = Date.now()
    return () => {
      console.log(Date.now() - startTime)
    }
  }
  )
  const { isAuthenticated, getToken, currentUser } = useAuth()
  const [create, { loading, error }] = useMutation(createCartMenuItem, {
    refetchQueries: [{ query: HeaderCartsCellQuery, notifyOnNetworkStatusChange: true }],
    awaitRefetchQueries: true,
    onCompleted: () => { toast.success('Eşya başarıyla sepete eklendi') },
  })
  console.log(loading, error);
  const [isItemInCart, setIsItemInCart] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const totPrice = quantity * menuItem.price



  const handleAddToCart = async () => {
    if (isAuthenticated) {

      try {
        await create({
          variables: {
            input: {
              menuItemId: menuItem.id,
              quantity: quantity,
              userId: currentUser.id,
              inCart: true,
              orderPrice: totPrice
            }

          }

        })


      } catch (error) {
        console.log(error)
      }

      /* try {
        const response = await fetch('/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-provider': 'dbAuth',
            cookie: `"${await getToken()}"`,
            authorization: `Bearer ${currentUser.id}`,
          },
          body: JSON.stringify({
            query: `mutation MyMutation {
              createCartMenuItem(
                input: {menuItemId: ${menuItemId}, quantity: ${quantity}, userId: ${currentUser.id}, inCart: ${isItemInCart}, orderPrice: ${totPrice}, restaurantCode: ${menuItem.restaurantCode}}
              ) {
                menuItemId
                quantity
              }
            }`,
          }),
        })
        const jsonResponse = await response.json()
        console.log(jsonResponse.message)
        if (jsonResponse.message) {
          toast(jsonResponse.message)
          setIsItemInCart(true)
        } else if (jsonResponse.error) {
          toast.error(jsonResponse.error)
          setIsItemInCart(false)
        }
      } catch (error) {
        console.error(error)
      }*/
    } else {
      // Display login message
      toast.error('Sepete ekleme işlemi için giriş yapmalısınız.')
    }
  }

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10)
    const isValidQuantity = !isNaN(newQuantity) && newQuantity >= 1

    if (isValidQuantity) {
      setQuantity(newQuantity)
    } else {
      setQuantity(1)
    }
  }

  return (
    <><Toaster toastOptions={{ className: 'rw-toast', duration: 2000 }} />
      <div className="max-w-sm overflow-hidden rounded shadow-lg">
        <img
          className="h-[300px] w-[500px]"
          src={menuItem.logo}
          alt="Card Image"
        />
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">{menuItem.name}</div>
          <p className="text-base text-gray-700">{menuItem.description}</p>
          <label htmlFor="quantity" className="mr-2 text-gray-600">
            Adet:
          </label>
          <input
            id="quantity"
            type="number"
            className="w-32 rounded border border-gray-300 px-2 py-1"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
          {!loading ?

          <button
            className="mx-4 rounded bg-blue-500 px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-blue-700"
            onClick={() => handleAddToCart()}
          >
            Sepete Ekle
          </button> :<Spinner/>
          }
          <div className="mt-4 flex items-center justify-between">
            <div className="font-bold text-gray-800">
              Toplam Fiyat: {totPrice}₺
            </div>
            <div className="flex items-center"></div>
          </div>
        </div>
      </div></>
  )
}

export default MenuItem
