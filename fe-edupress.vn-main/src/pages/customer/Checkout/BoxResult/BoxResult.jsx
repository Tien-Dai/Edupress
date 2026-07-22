
import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";
import ArrowRightIcon from "../../../../components/icons/ArrowRightIcon";

const BoxResult = ({ status }) => {
  if (!status) return null;

  const config = {
    paid: {
      antdStatus: "success",
      title: "Thanh toán thành công!",
      subTitle: "Cảm ơn bạn đã mua khóa học!",
    },
    cancelled: {
      antdStatus: "error",
      title: "Huỷ đơn hàng!",
      subTitle: "Đơn hàng đã bị huỷ. Vui lòng tạo đơn mới!",
    },
  };

  const { antdStatus, title, subTitle } =
    config[status] || config.cancelled; 

  return (
    <Result
      status={antdStatus}
      title={title}
      subTitle={subTitle}
      className="shadow-lg rounded-2xl bg-white "
      extra={[
        <div
          key="checkout-history"
          className="flex justify-center flex-col items-center"
        >
          <Link
            to={
              status === "paid"
                ? "/checkout-history"
                : "/cart"
            }
            className="
              text-[12px] md:text-[14px] lg:text-[16px] font-semibold
              flex justify-center items-center
              border border-gray-500 border-dashed
              text-gray-500 rounded-[5px] px-[10px] h-[40px]
              transition-all duration-300 ease-in-out
              hover:bg-gray-500 hover:text-blue-500 hover:border-blue-500
              hover:scale-95
            "
          >
            <ArrowRightIcon size={20} />
                {
                    status === "paid" && status !== "pending"
                    && "Xem lịch sử giao dịch"
                }
                 {
                    status === "cancelled" && status !== "pending"
                    && "Thực hiện mua lại khóa học"
                }
          </Link>
        </div>,
      ]}
    />
  );
};

export default BoxResult;
