import { useEffect, useState } from "react";
import { Dialog } from '@reach/dialog';
import { set } from "@redwoodjs/forms";
import PaymentComponent from "../PaymentComponent/PaymentComponent";

interface PaymentSelectionMenuProps {
  isPaymentPopupOpened: boolean;
  paymentAmount: number;
}
const PaymentSelectionMenu: React.FC<PaymentSelectionMenuProps> = ({isPaymentPopupOpened, paymentAmount}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<String | null | undefined>('');
  const [isPaymentPopupOpen, setPaymentPopupOpen] = useState(isPaymentPopupOpened);
  const [selectedMethod, setSelectedMethod] = useState(false);

  return (
    <>
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
          setSelectedPaymentMethod('credit-card-online');
          setSelectedMethod(true);

        }}
      >
        Kredi Kartı (Online payment)
      </button>
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={() => {
          setSelectedPaymentMethod('credit-card');
          setSelectedMethod(true);

        }}
      >
        Kredi Kartı (Kapıda Ödeme)
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-red-300"
        onClick={() => {
          setSelectedPaymentMethod('cash');
          setSelectedMethod(true);

        }}
      >
        Nakit
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={() => {
          setSelectedPaymentMethod('crypto-currency');
          setSelectedMethod(true);
          //handleCryptoPaymentClick();
        }}
      >
        Cryptocurrency
      </button>
      <div className="flex flex-col items-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={() => {;
            setPaymentPopupOpen(false);
            setSelectedMethod(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</Dialog>
  {selectedMethod && (
    <PaymentComponent selectedPaymentMethod={selectedPaymentMethod} paymentAmount={paymentAmount} />
  )}

  </>
  );
};

export default PaymentSelectionMenu
