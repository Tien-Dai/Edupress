
import { Link } from "react-router-dom";
import BoxCheckoutInfo from "../BoxCheckoutInfo/BoxCheckoutInfo";
import BoxQR from "../BoxQR/BoxQR";
import ButtonCanceled from "./ButtonCanceled";

const BoxShowCheckout = ({currentCheckout, status, expired , time}) => {

  if (!currentCheckout) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] gap-6 p-6">

      {/* LEFT */}
      <div className="space-y-6">
        <h1 className="text-[14px] md:text-[16px] lg:text-[18px] font-bold text-gray-800">
          Thanh toán khóa học
        </h1>

        {status === "pending" && (
          <BoxCheckoutInfo currentCheckout={currentCheckout} />
        )}

        {status === "pending" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-700">
            ⏳ Vui lòng quét mã QR để hoàn tất thanh toán.
            Trang sẽ tự động cập nhật khi thanh toán thành công.
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-center justify-center gap-4">

        {
          status === "pending" && !expired && (
            <BoxQR currentCheckout={currentCheckout} />
          )
        }

        {/* STATUS */}
        <div className="flex flex-col justify-center gap-4 w-full">

          {
              status === "pending" && !expired && (
                <div>
                  <div className="flex items-center justify-center gap-3 text-yellow-600 font-medium">
                    <span>Thời gian thanh toán: {time}s</span>
                  </div>

                  <div className="flex items-center justify-center gap-3 text-blue-600 font-medium">
                    <span className="relative inline-flex w-3 h-3">
                      <span className="absolute inline-flex w-3 h-3 rounded-full bg-blue-600 animate-ping"></span>
                      <span className="relative inline-flex w-3 h-3 rounded-full bg-blue-600"></span>
                    </span>
                    <span>Chưa thanh toán</span>
                  </div>
                </div>
              )
            }
          {status === "pending" && expired && (
            <div className="flex items-center justify-center gap-3 text-red-500 font-medium">
              ⏳ Mã thanh toán đã hết hạn
            </div>
          )}

          <div className="w-full flex justify-center" >
              {status === "pending" && !expired && (
                <ButtonCanceled 
                  currentCheckout={currentCheckout} 
                />
              )}

              { expired && (
                <Link
                  to="/cart"
                  className="
                    text-[12px] md:text-[14px] lg:text-[16px]
                    font-semibold flex justify-center items-center
                    border border-red-500 border-dashed cursor-pointer
                    text-red-500 rounded-[5px] w-[120px] h-[40px] transition-all duration-300
                    hover:bg-red-500 hover:text-white hover:scale-95
                  "
                >
                  Mua lại
                </Link>
              )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BoxShowCheckout;
