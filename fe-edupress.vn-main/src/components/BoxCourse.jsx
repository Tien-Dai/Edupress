import { Link, useNavigate } from "react-router-dom";
import BagShoppingIcon from "../components/icons/BagShoppingIcon"
import ClockIcon from "../components/icons/ClockIcon";
import GraduationIcon from "../components/icons/GraduationIcon"
import { useCartStore } from "../stores/cart.store";
import { message, Modal, Spin } from "antd";
import useAuth from "../hooks/useAuth";
import { useMemo, useState } from "react";
import useFetchData from "../api/useFetchData";
const BoxCourse = ({item}) => {

    const {cart, addToCart} = useCartStore();
    const [adding, setAdding] = useState(false);
    const {user} = useAuth();
    const nav = useNavigate();
    const isNewCourse = (createdAt) => {

        if (!createdAt) return false;

        const diffDays =
            (Date.now() - new Date(createdAt)) / (1000 * 60 * 60 * 24);

        return diffDays <= 30;
    };

    let showBadge = null;

    if (isNewCourse(item.created_at)) {
        showBadge = "Khóa học mới";
    } else if (item.students >= 500) {
        showBadge = "🔥 Đặc biệt";
    } else if (item.feature) {
        showBadge = "⭐ Nổi bật";
    }

    const handleAddToCart = async () => {
        if (adding) return;

        if (!user?._id) {
            Modal.confirm({
            title: "Đăng nhập",
            content: "Vui lòng đăng nhập để thêm khóa học!",
            okText: "Đăng nhập",
            cancelText: "Hủy",
            onOk: () => nav("/login"),
            });
            return;
        }

        setAdding(true);

        const ok = await addToCart(
            {
                course_id: item._id,
                course_title: item.course_title,
                price: item.price,
                image_url: item.image_url,   
                total_lectures: item.total_lectures,
            },
            user._id
        );

        setAdding(false);

        ok
            ? message.success("Đã thêm vào giỏ")
            : message.warning("Khóa học đã có trong giỏ!");
    };

    // Kiểm tra sản phẩm đã mua chưa
    const { data : checkoutList } = useFetchData("checkout");
    const isPurchased = useMemo(() => {
        if (!checkoutList || !user) return false;

        return checkoutList.some(order =>
            order.user_id === user._id &&
            order.status === "paid" &&
            order.courses.some(course => course.course_id === item._id)
        );
    }, [checkoutList, user, item._id]);


    return (
        <div 
            className="
                flex flex-col justify-start group relative rounded-[10px]
                w-full h-auto border-[2px] border-[#EAEAEA]
                transform transition-transform duration-300 ease-in-out
                hover:shadow-2xl overflow-hidden 
            "
        >
            {/* <!-- Image --> */}
                <div className="relative overflow-hidden ">
                    <img 
                        src={item.image_url}
                        alt={item.course_title}
                        className="
                            w-full h-[120px] md:h-[180px] object-cover transform transition-transform duration-300 
                            ease-in-out rounded-t-[10px] group-hover:scale-110
                        " 
                    />
                    {
                        showBadge && (
                            <span 
                                className="
                                    text-[12px] font-semibold px-[10px] rounded-[8px] py-[5px] absolute top-4 left-4
                                    bg-orange-50 border-orange-400 text-orange-600 z-[30]
                                "
                            >
                                {showBadge}
                            </span>
                        )
                    }
                    <div 
                        className="
                            absolute w-full h-full top-0 left-0 z-[10] opacity-0 transform transition-opacity 
                            duration-300 ease-in-out group-hover:bg-black/50 group-hover:opacity-100
                        "
                    >
                       <button
                            onClick={handleAddToCart}
                            disabled={adding || isPurchased}
                            className={`
                                absolute top-[85%] right-1/2 translate-x-1/2
                                w-[50px] h-[50px] rounded-full flex justify-center items-center
                                z-[30] transition-all duration-300 ease-in-out

                                ${isPurchased
                                ? "bg-green-500 cursor-not-allowed opacity-100 group-hover:-translate-y-[150%]"
                                : adding
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#FF782D] hover:scale-110 hover:opacity-90 cursor-pointer"
                                }

                                ${!isPurchased && "opacity-0 group-hover:opacity-100 group-hover:-translate-y-[150%]"}
                            `}
                            >
                                {isPurchased ? (
                                    <span className="text-[10px] font-semibold text-white ">Đã mua</span>
                                ) : adding ? (
                                    <Spin size="small" />
                                ) : (
                                    <BagShoppingIcon size={26} className="text-white" />
                                )}
                        </button>


                    </div>
                </div>
            {/* <!-- Content --> */}
                <div className="px-[10px] md:px-[12px] lg:px-[15px] lg:pt-[10px] flex flex-col gap-[10px]">
                    {/* Author */}
                        <p className="text-[14px] font-medium text-gray-400">
                            <span className="">{item.author}</span>
                        </p>
                    {/* Title */}
                        <h4 className=" text-[12px] md:text-[16px] lg:text-[18px] leading-[16px] md:leading-[20px] lg:leading-[24px] font-semibold text-[#000000] group-hover:text-[#FF782D] line-clamp-2">
                            <Link 
                                to={`/detail/${item._id}`}
                                className="" 
                            >
                                {item.course_title}
                            </Link>
                        </h4>
                    {/* Info */}
                        <div className="flex items-center gap-[30px]">
                            <div className="flex  items-center ">
                                <ClockIcon size={22} className="text-[#FF782D] mr-[5px]" />
                                <p className="text-[10px] md:text-[14px] lg:text-[16px] font-regular text-[#555555]">{item.duration}</p>
                            </div>
                            <div 
                                className={
                                    `${item.students === 0 && "hidden"} flex items-center relative`
                                }
                            >
                                <div className="overflow-hidden">
                                    <GraduationIcon size={22} className="text-[#FF782D] mr-[5px]" />
                                </div>
                                <p className="text-[10px] md:text-[14px] lg:text-[16px] font-regular text-[#555555]">{item.students}</p>
                            </div>
                        </div>
                    {/* Line */}
                        <hr className=" border-[1px] border-[#EAEAEA] w-full" />
                    {/*  */}
                        <div className="flex items-center justify-between mb-[15px]">
                            <div className="text-[12px] md:text-[16px] lg:text-[18px]">
                                <span className="text-[#FF782D] font-semibold">
                                    { item.price === 0 
                                        ? <span className="text-green-400 font-semibold">Free</span>
                                        : `${Number(item.price).toLocaleString('vi-VN')} VND`
                                    }
                                </span>
                            </div>
                            <div className=" text-[12px] md:text-[14px] lg:text-[16px] text-black/40 font-regular">
                                <Link to={`/detail/${item._id}`} className="btnCourseDetail text-[#000000] hover:text-[#FF782D] hover:underline cursor-pointer">Chi tiết</Link>
                            </div>
                        </div>
                </div>
        </div> 
    )
}

export default BoxCourse;