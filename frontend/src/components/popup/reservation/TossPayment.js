import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { useEffect, useRef } from "react";

const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq"
const customerKey = "YbX2HuSlsC9uVJW6NMRMj"

export default function TossPayment({price}){
    const paymentWidgetRef = useRef(null)
    

    useEffect( () => {
        (async () => {

            try{
                const paymentWidget = await loadPaymentWidget(clientKey, customerKey)
                paymentWidget.renderPaymentMethods("#payment-widget",price)
                paymentWidgetRef.current = paymentWidget
            }catch(err){
                console.error("결제위젯로드실패 : ", err)
            }
        })()
    },[price])

    return (
        <div className="App">
            <h1>결제페이지</h1>
            <div id="payment-widget"></div>
        </div>
    )
}