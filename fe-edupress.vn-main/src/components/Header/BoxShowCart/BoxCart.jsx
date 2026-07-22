import { Spin } from "antd";
import { Link } from "react-router";

const BoxCart = ({ showCart, isReady }) => {
  if (!isReady) {
    return (
      <div className="p-4 text-center text-gray-400 flex flex-col items-center gap-2">
        <Spin size="large" />
        Đang tải giỏ hàng...
      </div>
    );
  }

  if (!showCart.length) {
    return (
      <div className="p-4 text-center text-gray-400 flex justify-center items-center h-[70px]">
        <span className="text-[14px] font-semibold border border-gray-300 w-full border-dashed flex justify-center items-center h-[40px]">
          Chưa có khóa học trong giỏ
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${
        showCart.length === 1 ? "h-[100px]" : "h-[180px]"
      } p-4 space-y-4 overflow-y-auto`}
    >
      {showCart?.map(item => (
        <div key={item.course_id} className="flex gap-3">
          <img
            src={item.image_url}
            alt={item.course_title}
            className="w-[60px] h-[60px] rounded-lg object-cover"
          />

          <div className="flex-1">
            <Link
              to={`/detail/${item.course_id}`}
              className="text-sm font-semibold line-clamp-2 text-black hover:text-[#FF782D]"
            >
              {item.course_title}
            </Link>

            <div className="flex items-center justify-between mt-1">
              <p className="text-[12px] text-gray-400">
                {item.total_lectures} bài giảng
              </p>

              <span className="text-[14px] font-semibold">
                {item.price === 0
                  ? <span className="text-green-500">Free</span>
                  : `${Number(item.price).toLocaleString("vi-VN")} VND`}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoxCart;
