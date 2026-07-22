

import { useMemo, useState } from "react";
import { message } from "antd";

export default function useCartPricing(showCart) {
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const mockCoupons = {
    GIAM20: 20,
    GIAM30: 30,
    GIAM40: 40,
  };

  const applyCoupon = () => {
    if (!couponInput.trim()) return;

    const code = couponInput.toUpperCase();
    const percent = mockCoupons[code];

    if (!percent) {
      message.error("Mã khuyến mãi không hợp lệ");
      return;
    }

    setAppliedCoupon({ code, percent });
    setCouponInput("");
    message.success(`Đã áp dụng mã ${code}`);
  };

  const totalOriginalPrice = useMemo(() => {
    if (!Array.isArray(showCart)) return 0;
    return showCart.reduce(
      (sum, c) => sum + Number(c.price || 0),
      0
    );
  }, [showCart]);

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return Math.round((totalOriginalPrice * appliedCoupon.percent) / 100);
  }, [appliedCoupon, totalOriginalPrice]);

  const finalTotal = totalOriginalPrice - couponDiscount;

  return {
    couponInput,
    setCouponInput,
    appliedCoupon,
    applyCoupon,
    totalOriginalPrice,
    couponDiscount,
    finalTotal,
    setAppliedCoupon
  };
}
