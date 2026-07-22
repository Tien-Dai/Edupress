import { message } from "antd";
import { useState } from "react";
import axios from "axios";
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

      await axios.put(
        `https://mindx-mockup-server.vercel.app/api/resources/checkout/${currentCheckout._id}?apiKey=6957348a9dda81df11d0c527`,
        {
          status: "cancelled",
          updated_at: new Date().toISOString(),
        }
      );

      message.success("Đã hủy đơn hàng");

      // 👉 reload lại checkout hiện tại
      fetchCheckoutByToken(currentCheckout.token);

    } catch (err) {
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
