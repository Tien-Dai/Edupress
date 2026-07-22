import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Spin } from "antd";

import useAuth from "../../../hooks/useAuth";
import { useCheckoutStore } from "../../../stores/checkout.store";
import BoxShowCheckout from "./BoxShowCheckout/BoxShowCheckout";
import { useCartStore } from "../../../stores/cart.store";
import BoxResult from "./BoxResult/BoxResult";

const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { updateCartAfterPayment } = useCartStore();
  const [cartUpdated, setCartUpdated] = useState(false);
  const [time, setTime] = useState(20);
  const [expired, setExpired] = useState(false);


  const {
    currentCheckout,
    loading,
    fetchCheckoutByToken,
  } = useCheckoutStore();

  useEffect(() => {
    if (token) {
      fetchCheckoutByToken(token);
    }
  }, [token]);

  // count down
  useEffect(() => {
    if (currentCheckout?.status !== "pending") return ;

    setTime(20);
    setExpired(false);

    const istime = setInterval(() =>{
      setTime(prev =>{
        if(prev <= 1){
          clearInterval(istime);
          setExpired(true);
          return 0;
        }
        return prev - 1; 
      });
    }, 1000);

    return () => clearInterval(istime);
  }, [currentCheckout?.status]);

 // sau 10s fetch lại  
  useEffect(() => {
    if (!token || expired) return;
    if (currentCheckout?.status !== "pending") return;

    const interval = setInterval(() => {
      fetchCheckoutByToken(token);
    }, 10000);

    return () => clearInterval(interval);
  }, [token, currentCheckout?.status, expired]);

  // update cart after payment
  useEffect(() => {
    if (
      currentCheckout?.status === "paid" &&
      !cartUpdated &&
      currentCheckout?.cart_id
    ) {
      const update = async () => {
        await updateCartAfterPayment(currentCheckout.cart_id);
        setCartUpdated(true);
      };

      update();
    }
  }, [currentCheckout?.status, currentCheckout?.cart_id, cartUpdated]);


  // ⏳ loading
  if (loading) {
    return (
      <div className="h-screen">
        <Spin fullscreen tip="Đang xử lý đơn hàng..." />
      </div>
    );
  }

  const status = currentCheckout?.status;

  return (
    <div className="mt-[90px] max-w-[1080px] mx-auto h-screen">
      <div className="w-full  bg-gray-50 h-screen">

        {
          status === "pending" ? (
            <BoxShowCheckout
              currentCheckout={currentCheckout}
              time={time}
              expired={expired}
              status={status}
            />
          ) : (
            <BoxResult 
              status={status} 
            />
          )
        }

      </div>
    </div>
  );
};

export default CheckoutPage;
