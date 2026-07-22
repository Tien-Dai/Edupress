import { Link } from "react-router";
import PopopConfirm from "../../Cart/PopopConfirm/PopopConfirm";
import { useCartStore } from "../../../../stores/cart.store";
import Item from "antd/es/list/Item";
import { useMemo } from "react";
import useCartPricing from "../../../../hooks/useCartPricing";

const BoxCartItem = ({ course, user, provider}) => {
  const { removeFromCart, cart } = useCartStore();
  const {
      setCouponInput,
      setAppliedCoupon
    } = useCartPricing(cart?.courses || []);

    
  const handleRemoveFromCart = async () => {
    if (!user?.id) return;
    const isLastItem = cart.courses.length === 1;
    await removeFromCart(course.course_id);

    if (isLastItem) {
      setAppliedCoupon(null);
      setCouponInput("");
    }
    return true;
  };


  const showNameProvider = useMemo(() => {
    if (!cart?.courses?.length || !provider || !course) return null;

    // kiểm tra course này có trong cart không
    const isInCart = cart.courses.some(
      c => c.course_id === course._id
    );

    if (!isInCart) return null;

    // tìm provider theo provider_id của COURSE
    return provider.find(
      p => String(p.id) === String(course.provider_id)
    ) || null;

  }, [cart, course, provider]);


  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex gap-4">
      {/* IMAGE */}
      <img
        src={course.image_url}
        alt={course.course_title}
        className="w-48 h-28 object-cover rounded-lg"
      />

      {/* INFO */}
      <div className="flex-1">
        <Link
          to={`/detail/${course._id}`}
          className="font-bold text-[16px] leading-snug"
        >
          {course.course_title}
        </Link>
        {showNameProvider && (
          <p className="text-sm">
            Giảng viên:{" "}
            <span className="font-semibold text-[#ff9a1e]">
              {showNameProvider.provider_name}
            </span>
          </p>
        )}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
          <p className="text-[12px]">
            <strong>{course.total_sections}</strong> phần
          </p>
          <p className="text-[12px]">
            <strong>{course.total_lectures}</strong> bài học
          </p>
          <p className="text-[12px]">Tất cả cấp độ</p>
        </div>

        <PopopConfirm handleRemoveFromCart={handleRemoveFromCart} />
      </div>

      {/* PRICE */}
      <div className="text-right min-w-[120px]">
        <div className="text-lg font-bold text-[#ff2a00]">
          {Number(course.price).toLocaleString("vi-VN")} VND
        </div>
      </div>
    </div>
  );
};

export default BoxCartItem;