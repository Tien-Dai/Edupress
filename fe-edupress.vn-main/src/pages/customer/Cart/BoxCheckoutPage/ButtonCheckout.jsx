import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import useAuth from "../../../../hooks/useAuth";
import ArrowRightIcon from "../../../../components/icons/ArrowRightIcon";
import { useCartStore } from "../../../../stores/cart.store";
import { api } from "../../../../api/api";

const ButtonCheckout = ({
  showCart,
  cart,
  finalTotal,
  setCouponInput,
  appliedCoupon,
  setAppliedCoupon,
}) => {
  const { user } = useAuth();
  const { updateCartAfterPayment } = useCartStore();

  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const handleCheckout = async () => {
    // ==============================
    // 1. KIỂM TRA GIỎ HÀNG
    // ==============================
    if (!showCart?.length) {
      message.warning("Giỏ hàng trống");
      return;
    }

    // ==============================
    // 2. KIỂM TRA ĐĂNG NHẬP
    // ==============================
    if (!user?._id) {
      message.warning("Vui lòng đăng nhập để thanh toán");
      nav("/login");
      return;
    }

    try {
      setLoading(true);

      // ==============================
      // 3. TẠO DỮ LIỆU THANH TOÁN
      // ==============================
      const payload = {
        user_id: user._id,

        cart_id: cart?._id || null,

        courses: showCart.map((item) => ({
          course_id: item.course_id,

          title:
            item.course_title ||
            item.title ||
            "",

          price: Number(item.price) || 0,

          image_url:
            item.image_url ||
            "",

          total_lectures:
            item.total_lectures ||
            0,
        })),

        coupon: appliedCoupon
          ? {
              code: appliedCoupon.code,
              percent: appliedCoupon.percent,
            }
          : null,

        total: Number(finalTotal) || 0,
      };

      // ==============================
      // 4. GỌI BACKEND THANH TOÁN
      // ==============================
      const response = await api.post(
        "/payment/checkout",
        payload
      );

      if (!response.data) {
        message.error("Thanh toán thất bại");
        return;
      }

      // ==============================
      // 5. XÓA / ĐÓNG GIỎ HÀNG
      // ==============================
      if (cart?._id) {
        await updateCartAfterPayment(cart._id);
      }

      // ==============================
      // 6. RESET COUPON
      // ==============================
      if (setAppliedCoupon) {
        setAppliedCoupon(null);
      }

      if (setCouponInput) {
        setCouponInput("");
      }

      // ==============================
      // 7. THÔNG BÁO THANH TOÁN THÀNH CÔNG
      // ==============================
      message.success(
        "Thanh toán thành công! Bạn đã có thể học khóa học."
      );

      // ==============================
      // 8. ĐỢI 3 GIÂY RỒI VỀ TRANG CHỦ
      // ==============================
      setTimeout(() => {
        nav("/");
      }, 3000);

    } catch (error) {
      console.error(
        "PAYMENT ERROR:",
        error?.response?.data || error
      );

      message.error(
        error?.response?.data?.message ||
        "Thanh toán thất bại. Vui lòng thử lại!"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`
        w-full
        mt-5
        bg-[#FF782D]

        ${
          loading
            ? "opacity-60 cursor-not-allowed"
            : "hover:opacity-60 hover:scale-95"
        }

        flex
        items-center
        justify-center
        gap-3

        text-[10px]
        md:text-[12px]
        lg:text-[14px]

        text-white

        h-[40px]
        lg:h-[48px]

        rounded-lg

        font-semibold

        transition
      `}
    >
      {loading ? (
        "Đang thanh toán..."
      ) : (
        <>
          <ArrowRightIcon size={20} />
          Thanh toán
        </>
      )}
    </button>
  );
};

export default ButtonCheckout;