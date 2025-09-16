import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { useEffect, useRef } from "react";


const TossPayment = ({price, ordername, onSuccess}) => {

        
        const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq"


        const handlePayment = () => {
        if (!window.TossPayments) {
            alert("토스 결제 SDK가 로드되지 않았습니다.");
            return;
        }

        const tossPayments = window.TossPayments(clientKey);
        tossPayments.requestPayment('카드', {
            amount: price,
            orderId: `order_${new Date().getTime()}`,
            orderName: ordername,
            customerName: "예약자",
            successUrl: window.location.href,
            failUrl: window.location.href
        })
        .then(result => {
            console.log("결제 성공:", result);
            if(onSuccess) onSuccess();
        })
        .catch(error => {
            console.error("결제 실패:", error);
            alert("결제에 실패했습니다.");
        });
    }

    return (
        <div className="w-full flex justify-center items-center mt-4">
            <button 
                className="rounded p-2 w-4/5 bg-green-500 text-xl text-white"
                onClick={handlePayment}
            >
                결제하기
            </button>
        </div>
    );
}

export default TossPayment;
