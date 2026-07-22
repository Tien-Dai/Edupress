import { message } from "antd";
import ButtonCheckout from "./ButtonCheckout";
import useCartPricing from "../../../../hooks/useCartPricing";

const BoxCheckoutPage = ({ showCart, cart }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const {
    couponInput,
    setCouponInput,
    appliedCoupon,
    applyCoupon,
    totalOriginalPrice,
    couponDiscount,
    finalTotal,
    setAppliedCoupon,
  } = useCartPricing(showCart, messageApi);

  return (
    <div>
      {contextHolder}

      <div className="bg-white rounded-xl shadow-sm p-5 h-fit sticky top-24">
        <h3 className="text-[14px] md:text-[16px] lg:text-[18px] mb-4 text-[#6d6d6d]">
          Thanh toán
        </h3>

        <div className="space-y-2">
          <div className="flex justify-between font-semibold">
            <span className="text-[12px] md:text-[14px] lg:text-[16px]">
              Tạm tính:
            </span>
            <div>
              {!showCart.length ? (
                "0"
              ) : totalOriginalPrice === 0 ? (
                <span className="text-green-500">Free</span>
              ) : (
                `${totalOriginalPrice.toLocaleString("vi-VN")} VND`
              )}
            </div>
          </div>

          {appliedCoupon && (
            <div className="flex justify-between text-green-600">
              <span>Giảm ({appliedCoupon.percent}%)</span>
              <span>
                -{couponDiscount.toLocaleString("vi-VN")} VND
              </span>
            </div>
          )}

          <hr className="lg:my-4 text-gray-300" />

          <div className="flex justify-between font-bold">
            <span className="text-[12px] md:text-[14px] lg:text-[16px]">
              Tổng
            </span>
            <span className="text-[#c00000] text-[12px] md:text-[14px] lg:text-[16px]">
              {finalTotal.toLocaleString("vi-VN")} VND
            </span>
          </div>
        </div>

        <ButtonCheckout
          showCart={showCart}
          finalTotal={finalTotal}
          setCouponInput={setCouponInput}
          appliedCoupon={appliedCoupon}
          setAppliedCoupon={setAppliedCoupon}
          cart={cart}
        />

        <p className="text-[10px] md:text-[12px] lg:text-[14px] text-gray-500 mt-1">
          Bạn sẽ không bị tính phí ngay bây giờ
        </p>

        <hr className="my-4 text-gray-300" />

        {/* COUPON */}
        <h3 className="font-bold text-[14px] md:text-[16px] lg:text-[18px]">
          Khuyến mãi
        </h3>
        <div className="text-[10px] md:text-[12px] lg:text-[14px] text-gray-600 border-[1px] border-dashed p-2 rounded-2xl border-[#25c916]">
          <p>Nhân dịp năm mới EduExpress giảm giá <strong>20%</strong> tất cả khóa học!</p>
          <span className="font-semibold">Mã khuyến mãi:  <strong className="text-[#25c916] text-[18px] font-sans"> GIAM20</strong></span>
        </div>
        <div className="mt-3 flex gap-2">
          <input
            value={couponInput}
            onChange={e => setCouponInput(e.target.value)}
            disabled={!!appliedCoupon}
            placeholder={appliedCoupon ? "Đã áp dụng" : "Mã khuyến mãi..."}
            className="
              w-full border-b-[0.5px] border-b-gray-400
              outline-none rounded-[5px] px-2
              text-[10px] md:text-[12px] lg:text-[14px]
            "
          />

          <button
            onClick={() => {
              if (appliedCoupon) return;
              applyCoupon();
            }}
            className={`
              w-full h-[40px] rounded-lg font-semibold transition
              text-[10px] md:text-[12px] lg:text-[14px]
              ${
                appliedCoupon
                  ? "border border-dashed border-gray-400 text-gray-400 cursor-default bg-transparent"
                  : "bg-[#FF782D] text-white hover:opacity-60 hover:scale-95"
              }
            `}
          >
            {appliedCoupon ? "Đã áp dụng mã" : "Áp dụng"}
          </button>
        </div>

        {appliedCoupon && (
          <p className="text-green-600 text-sm mt-2">
            Đã áp dụng mã <b>{appliedCoupon.code}</b> (-{appliedCoupon.percent}%)
          </p>
        )}
      </div>
    </div>
  );
};

export default BoxCheckoutPage;
