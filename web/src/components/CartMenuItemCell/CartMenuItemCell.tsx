
import { type CellSuccessProps, type CellFailureProps, useMutation } from '@redwoodjs/web'
import { useRef, useState } from 'react'
import { toast } from '@redwoodjs/web/dist/toast'
import { Query, UpdateCartMenuItemInput } from 'types/graphql'
import { CreateOrderInput } from 'types/graphql'
import { Dialog } from '@reach/dialog';
import VisuallyHidden from '@reach/visually-hidden';
import { useAuth } from 'src/auth'
import { QUERY as HeaderCartsCellQuery } from '../../components/HeaderCartsCell'
import { ethers } from "ethers";
import { BrowserProvider, Eip1193Provider } from "ethers";
import { set } from '@redwoodjs/forms'
import Spinner from '../Spinner/Spinner'

declare global {
  interface Window {
    ethereum: Eip1193Provider & BrowserProvider;
  }
}

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
          restaurantCode
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
      restaurantCode
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
  const [isPaymentPopupOpen, setPaymentPopupOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isCryptoPopupOpen, setCryptoPopupOpen] = useState(false);
  const [cryptoTotalAmount, setCryptoTotalAmount] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [ethAmount, setEthAmount] = useState(0);
  const [walletLoading, setWalletLoading] = useState(false);
  const [transactionSuccessLoading, setTransactionSuccessLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const destinationAddress = "0xe0C283B6669BbB55eC1a547ED279640A930a2841";
  const sendTransaction = async () => {
    setTransactionSuccessLoading(true);
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();

        // Replace with your transaction details
        const transaction = {
          to: destinationAddress,
          value: ethers.parseEther(ethAmount.toString()), // Convert ETH amount to wei
        };

        // Send the transaction
        const txResponse = (await signer).sendTransaction(transaction);

        // Wait for the transaction to be confirmed
        await (await txResponse).wait();
        toast.success('Transaction sent successfully');
        setTransactionSuccessLoading(false);
        // Transaction successful, you can handle the success here
        console.log("Transaction sent successfully");
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }
          , 3000);
      } else {
        console.error("Ethereum provider not found");
        toast.error('Ethereum provider not found');
        setTransactionSuccessLoading(false);
      }
    } catch (error) {
      console.error("Error sending transaction:", error);
      toast.error('Failed to send transaction');
      setTransactionSuccessLoading(false);
    }
  };
  const handlePayClick = async () => {
    try {
      // Send the transaction
      await sendTransaction();

      // Close the payment popup
      setPaymentPopupOpen(false);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  }
  const payButtonClickHandler = () => {
    handlePayClick();
    return ethAmount;
  };
  const tryToEthereum = async (try_amount: number) => {
    try {
        // Fetch try to ethereum currency converter using API KEY from .env file
        const api_key = "cur_live_bJ1mtZNQJNlky8Vx1FHQzpEFRX3aYxbbJEGwqXmp"
        console.log(api_key);
        let url = `https://api.currencyapi.com/v3/latest?apikey=${api_key}&currencies=ETH&base_currency=TRY`;
        console.log(url);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        console.log(data.data.ETH.value)
        let number = data.data.ETH.value

        // Convert try to ethereum
        let eth_amount = try_amount * number;
        console.log(eth_amount);

        setEthAmount(eth_amount);
        return eth_amount;

    } catch (error) {
        console.error("An error occurred:", error);
        // You might want to handle the error further or return a default value
        return null;
    }


}


  const requestWalletAddress = async () => {
    setWalletLoading(true);
    console.log('Requesting wallet address...');
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          console.log('Wallet address:', accounts[0]);
          setWalletAddress(accounts[0]);
          setWalletConnected(true);
        })
        .catch((error) => {
          console.error('Error requesting wallet address:', error);
          setWalletConnected(false);
        })
        .finally(async () => {
          setWalletLoading(false);
          toast.success('Wallet connected');
          await tryToEthereum(calculateTotalPrice());
        });
    }
    else {
      toast.error('You need to install MetaMask to use this feature.');
      console.error('Ethereum provider not found');
      setWalletConnected(false);
      setWalletLoading(false);
    }

  }
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
      const restaurantCode = cart[0].menuItem.restaurantCode as number;
      const { data } = await  createOrder({
        variables: {
          input: {
            userId: id,
            status: 'PENDING',
            total: calculateTotalPrice(),
            cartMenuItemIds: cart.map((cartItem) => cartItem.id) as number[],
            restaurantCode: restaurantCode,
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
  const handleBuyClick = () => {
    setPaymentPopupOpen(true);
  };

  const handleCryptoPaymentClick = () => {
    setCryptoTotalAmount(calculateTotalPrice()); // Set the total amount for payment
    setCryptoPopupOpen(true);
  };


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

            // open the payment popup
            setPaymentPopupOpen(true);

          }}>Ödeme kısmına geç</button>
      </div>

      {/* Crypto Payment Popup */}
      <Dialog
    isOpen={isCryptoPopupOpen}
    onDismiss={() => setCryptoPopupOpen(false)}
    className="fixed inset-0 flex items-center justify-center"
    style={{ backdropFilter: 'blur(2px)' }}
  >
    <div className="bg-white p-4 rounded-lg border border-gray-300 text-center shadow-lg">
      <h2 className="text-lg font-semibold">Cryptocurrency Payment</h2>
      <img
      src="https://i.ibb.co/9wXMVCn/qr.jpg"
      className="h-[200px] w-[200px]"
      alt="qr"
      />
      <div className="flex justify-center space-x-4 mt-4">
      {walletConnected ? (
        <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-green-300 flex items-center justify-center relative"
        onClick={payButtonClickHandler}
      >
        {transactionSuccessLoading ? (
          <div className="animate-pulse">
            Transaction In Process...
          </div>
        ) : showSuccessMessage ? (
          <div className="animate-ping">
            Payment Successful!
          </div>
        ) : (
          `Pay: ${ethAmount} ETH`
        )}
      </button>
      ) : (
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-green-300 flex items-center justify-center"
          onClick={requestWalletAddress}
          disabled={walletLoading}
        >
          {walletLoading ? <Spinner /> : 'Connect Wallet'}
        </button>
      )}
    </div>
    </div>
  </Dialog>
      {/* Payment Popup */}
<Dialog
  isOpen={isPaymentPopupOpen}
  onDismiss={() => setPaymentPopupOpen(false)}
  className="fixed inset-0 flex items-center justify-center"
  style={{ backdropFilter: 'blur(2px)' }}
>
  <div className="bg-white p-4 rounded-lg border border-gray-300 text-center shadow-lg">
    <h2 className="text-lg font-semibold">Ödeme Yöntemi Seçimi</h2>
    <div className="flex justify-center space-x-4 mt-4">
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={() => {
          setSelectedPaymentMethod('credit-card');
          handleBuyClick();
        }}
      >
        Kredi Kartı (Online payment)
      </button>
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={() => {
          setSelectedPaymentMethod('credit-card');
          handleBuyClick();
        }}
      >
        Kredi Kartı (Kapıda Ödeme)
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-red-300"
        onClick={() => {
          setSelectedPaymentMethod('cash');
          handleBuyClick();
        }}
      >
        Nakit
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={() => {
          setSelectedPaymentMethod('crypto-currency');
          handleCryptoPaymentClick();
        }}
      >
        Cryptocurrency
      </button>
      <div className="flex flex-col items-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={() => {;
            setPaymentPopupOpen(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</Dialog>

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
