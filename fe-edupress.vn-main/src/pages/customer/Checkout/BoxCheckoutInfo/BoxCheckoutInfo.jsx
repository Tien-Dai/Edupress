import { useMemo } from "react";
import BoxShowCoursesCheckout from "./BoxShowCourseCheckout";
import { useCartStore } from "../../../../stores/cart.store";
import useAuth from "../../../../hooks/useAuth";


const BoxCheckoutInfo = ({currentCheckout}) => {

    const {cart} =  useCartStore();
    const { user } = useAuth();
     const showCheckout = useMemo(() => {
        if (!cart?.courses) return [];

        return cart.courses.map(item => ({
            course_id: item.course_id,
            course_title: item.course_title,
            price: item.price,
            image_url: item.image_url,
            total_lectures: item.total_lectures
        }));
    }, [cart]);

    return (
        <div className=" text-gray-600">

             <div className="flex justify-between my-3">
                <span className="text-[12px] md:text-[14px] lg:text-[16px] font-sans text-[#b3b3b3]">Mã đơn</span>
                <span className="font-medium text-gray-800 text-[12px] md:text-[14px] lg:text-[16px]">
                    {currentCheckout?.cart_id}    
                </span>
            </div>

            <hr className="border-gray-300 py-1" />

            <div className="flex justify-between mb-3">
                <span className="text-[12px] md:text-[14px] lg:text-[16px] font-sans text-[#b3b3b3]">Học viên</span>
                <span className="font-medium text-gray-800 text-[12px] md:text-[14px] lg:text-[16px]">
                    {user?.username}
                </span>
            </div>

            <div>
                <div className="flex justify-between mb-3">
                    <span className="text-[12px] md:text-[14px] lg:text-[16px] font-sans text-[#b3b3b3]">Khóa học</span>
                    <span className="font-medium text-gray-800 text-[12px] md:text-[14px] lg:text-[16px]">
                        ({showCheckout.length})khóa học
                    </span>
                </div>
                <div className="flex flex-col gap-4 mb-4 border border-dashed border-gray-300 p-3 rounded-lg">
                    {
                        showCheckout.length > 0 && showCheckout?.map(item => (
                            <BoxShowCoursesCheckout key={item.course_id} item={item} />
                        ))  
                    }
                </div>
            </div>

            <hr className="border-gray-300 py-1" />

            <div className="flex justify-between my-3">
                <span className="text-[12px] md:text-[14px] lg:text-[16px] font-sans text-[#b3b3b3]">Giảm giá</span>
                    {
                        currentCheckout?.coupon === null ? '—' : (
                            <span className="font-medium text-green-600">
                                {currentCheckout?.coupon.code} (-{currentCheckout?.coupon.percent}%)
                            </span>
                        )
                    }
            </div>
            <div className=" flex justify-between text-base">
                <span className="font-bold text-[#000000]">Tổng tiền</span>
                <span className="font-bold text-[14px] md:text-[16px] lg:text-[18px] text-red-600">
                    {Number(currentCheckout?.total).toLocaleString("vi-VN")} VND
                </span>
            </div>
        </div>
    )
}

export default BoxCheckoutInfo;