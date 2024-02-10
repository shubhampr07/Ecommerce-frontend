"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);

  const onCheckout = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        productIds: items.map((item) => item.id)
      });
      console.log('Response from backend:', response);
      window.location = response.data.url;
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error appropriately, e.g., show a toast message
    }
  }
  

  return ( 
    <div
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
         <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
}
 
export default Summary;

// "use client";
// import React, { Suspense, useState } from "react";
// import { useRouter } from "next/navigation";
// //import Loading from "@/app/loading";
// //import { useSession } from "next-auth/react";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// const PaymentButton = ({ amount }) => {
//   const { userData } = useSession();
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const makePayment = async () => {
//     setIsLoading(true);

//     // make an endpoint to get this key
//     const key = "rzp_test_M******Pw5***n";
//     const data = await fetch("/api/order/create?amount=" + amount);
//     const { order } = await data?.json();
//     const options = {
//       key: key,
//       name: userData.user?.email,
//       currency: order.currency,
//       amount: order.amount,
//       order_id: order.id,
//       modal: {
//         ondismiss: function () {
//           setIsLoading(false);
//         },
//       },
//       handler: async function (response) {
//         const data = await fetch("/api/order/verify", {
//           method: "POST",
//           body: JSON.stringify({
//             razorpayPaymentId: response.razorpay_payment_id,
//             razorpayOrderId: response.razorpay_order_id,
//             razorpaySignature: response.razorpay_signature,
//             email: userData.user?.email,
//           }),
//         });

//         const res = await data.json();
//         if (res?.error === false) {
//           // redirect to success page
//           router.push("/success");
//         }
//       },
//       prefill: {
//         email: userData.user?.email,
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();

//     paymentObject.on("payment.failed", function (response) {
//       alert("Payment failed. Please try again.");
//       setIsLoading(false);
//     });
//   };

//   return (
//     <>
//       <Suspense fallback={<Loading />}>
//         <div className="">
//           <Button
//             className={cn(buttonVariants({ size: "lg" }))}
//             disabled={isLoading}
//             onClick={makePayment()}
//           >
//             Pay Now
//           </Button>
//         </div>
//       </Suspense>
//     </>
//   );
// };

// export default PaymentButton;
