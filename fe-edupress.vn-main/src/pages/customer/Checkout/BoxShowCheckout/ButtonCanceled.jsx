import { message } from "antd";
import { useState } from "react";
import { api } from "../../../../api/api";
import { useCheckoutStore } from "../../../../stores/checkout.store";

const ButtonCanceled = ({ currentCheckout }) => {
  const [loading, setLoading] = useState(false);

  const fetchCheckoutByToken = useCheckoutStore(
    (state) => state.fetchCheckoutByToken
  );

  const handleCancelCheckout = async () => {
    if (!currentCheckout) return;

    try {
      setLoading(true);

      await api.put(`/checkout/${currentCheckout._id}`, {
        status: "cancelled",
        updated_at: new Date().toISOString(),
      });

      message.success("Đã hủy đơn hàng");

      // Reload lại dữ liệu
      fetchCheckoutByToken(currentCheckout.token);
    } catch (err) {
      console.log(err);
      message.error("Hủy đơn hàng thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading || currentCheckout.status !== "pending"}
      onClick={handleCancelCheckout}
      className="
        text-[12px] md:text-[14px] lg:text-[16px]
        font-semibold flex justify-center items-center
        border border-red-500 border-dashed
        text-red-500 rounded-[5px]
        w-[120px] h-[40px]
        transition-all duration-300
        hover:bg-red-500 hover:text-white
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {loading ? "Đang hủy..." : "Hủy đơn"}
    </button>
  );
};

export default ButtonCanceled;