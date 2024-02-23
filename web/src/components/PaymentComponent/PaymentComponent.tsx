import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "@redwoodjs/web/dist/toast";
interface PaymentComponentProps {
  selectedPaymentMethod: String;
  paymentAmount: number;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({selectedPaymentMethod: String, paymentAmount }) => {
  const [ethAmount, setEthAmount] = useState(0);
  const [isPaymentPopupOpen, setPaymentPopupOpen] = useState(false);
  const [transactionSuccessLoading, setTransactionSuccessLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');


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
  return (
    <div>
      <h2>{'PaymentComponent'}</h2>
      <p>
        {
          'Find me in ./web/src/components/PaymentComponent/PaymentComponent.tsx'
        }
      </p>
    </div>
  )
}

export default PaymentComponent
