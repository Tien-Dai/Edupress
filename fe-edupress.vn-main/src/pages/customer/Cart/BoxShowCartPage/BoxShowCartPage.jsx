import { Spin } from "antd";
import BoxCartItem from "./BoxCartItem";


const BoxShowCartPage = ({ showSpin, showCart, user, provider }) => {
  return (
    <div className="relative">
      {showSpin ? (
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      ) : showCart.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <img src="/images/cart-img.png" alt="empty-cart" className="mx-auto w-[150px] lg:w-[200px] h-auto" />
          <span className="text-[10px] md:text-[12px] lg:text-[14px] font-semibold text-[#bcbcbc]">
            Chưa có khóa học trong giỏ hàng
          </span>
        </div>
      ) : (
        <div className="space-y-4">
          {showCart?.map(course => (
            <BoxCartItem
              key={course.course_id}
              course={course}
              user={user}
              provider={provider}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoxShowCartPage;
