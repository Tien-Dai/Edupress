
import { Spin } from "antd";
import CircleCheckIcon from "../../../../components/icons/CircleCheckIcon";
import BoxModalVideo from "./BoxModalVideo";
import useAuth from "../../../../hooks/useAuth";
import useFetchData from "../../../../api/useFetchData";
import { useMemo } from "react";
import { Link } from "react-router";

const BoxCourseInfoCard = ({
    showList, 
    loading, 
    adding, 
    handleAddToCart,
    isPurchased
}) => {
    if(!loading && !showList) {
        return(
            <div
                className={
                `
                 bg-white text-gray-800 rounded-[10px] shadow-xl p-4 transition-all duration-500 border-[0.5px] border-[#EAEAEA] 
                `
            }
            >
                <div 
                    className="animate-pulse w-full h-[20px] md:h-[25px] lg:h-[200px] bg-[#d8d8d8] flex items-center justify-center"
                >
                    <Spin size="large"/>
                </div>
                <p className="animate-pulse w-40 h-[20px] md:h-[25px] lg:h-[30px] bg-[#d8d8d8] mt-2"></p>

                <div className="flex gap-3">
                    <p className="animate-pulse w-full h-[20px] md:h-[25px] lg:h-[30px] bg-[#d8d8d8] mt-2"></p>
                    <p className="animate-pulse w-full h-[20px] md:h-[25px] lg:h-[30px] bg-[#d8d8d8] mt-2"></p>
                </div>
                <p className="animate-pulse w-40 h-[5px] md:h-[10px] lg:h-[10px] bg-[#d8d8d8] mt-2"></p>
            </div>
        )
    }

    return (
        <div
            className={
                `
                 bg-white text-gray-800 rounded-[10px] shadow-xl p-4 transition-all duration-500 border-[0.5px] border-[#EAEAEA] 
                `
            }
        >
            {
                showList && (
                   <div className="w-full">
                        {/* IMAGE + PREVIEW */}
                            <div className="relative group overflow-hidden rounded-lg w-full">
                                <img
                                    src={showList.image_url}
                                    alt={showList.course_title}
                                    className="
                                        w-full h-auto lg:h-[200px] object-cover transition-transform duration-300 ease-in-out
                                        group-hover:scale-110
                                    "
                                />

                                {/* Overlay play */}
                                <div
                                    className="
                                        absolute inset-0 
                                        flex flex-col items-center justify-center gap-2
                                        bg-black/30 opacity-100
                                        transition-opacity duration-300
                                    "
                                >
                                <BoxModalVideo 
                                    videoLink={showList.video_url}
                                />
                                <span className="text-[14px] md:text-[15px] font-semibold text-white underline">
                                    Xem trước khóa học
                                </span>
                                </div>
                            </div>

                        {/* PRICE */}
                            <div className="mt-3">
                                {showList.price === 0 ? (
                                <span className="text-green-400 font-semibold text-[18px]">
                                    Free
                                </span>
                                ) : (
                                <div className="text-[24px] md:text-[28px] text-red-600 font-bold">
                                    {Number(showList.price).toLocaleString("vi-VN")}
                                    <span className="text-[16px] underline align-super">đ</span>
                                </div>
                                )}
                            </div>

                        {/* BUTTONS */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-3 z-100">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={adding || isPurchased}
                                    className={`
                                        w-full py-2 rounded-md font-semibold
                                        transition-all duration-300

                                        ${isPurchased
                                        ? "bg-green-500 cursor-not-allowed text-white"
                                        : adding
                                            ? "bg-gray-400 cursor-not-allowed text-white"
                                            : "bg-[#FF782D] text-white hover:opacity-80 hover:scale-[0.97] cursor-pointer"
                                        }
                                    `}
                                    >
                                    {isPurchased
                                        ? "Đã mua"
                                        : adding
                                        ? <Spin size="small" />
                                        : "Thêm vào giỏ hàng"
                                    }
                                </button>
                                {
                                    isPurchased && (
                                        <Link
                                            to={`/learning/${showList._id}`}
                                            className="
                                                w-full border border-[#FF782D] text-[#FF782D] py-2 rounded-md font-semibold
                                                transition-all duration-300 text-center text-[10px] md:text-[12px] lg:text-[14px] 
                                                hover:bg-[#FF782D] hover:text-white
                                            "
                                        >
                                            Đi đến khóa học
                                        </Link>
                                    )
                                }
                                {
                                    !isPurchased && (
                                        <button
                                            className="
                                                w-full border border-[#FF782D] text-[#FF782D] py-2 rounded-md
                                                transition-all duration-300
                                                hover:bg-[#FF782D] hover:text-white
                                            "
                                        >
                                            Đăng ký khóa học
                                        </button>
                                    )
                                }
                            </div>

                        {/* FOOTER */}
                            <p className="mt-3 flex items-center gap-1 text-[12px] text-gray-400">
                                <CircleCheckIcon size={16} className="text-gray-400" />
                                <span>Truy cập trọn đời · Chứng nhận</span>
                            </p>
                    </div>

                )
            }
        </div>
    )
}

export default BoxCourseInfoCard;