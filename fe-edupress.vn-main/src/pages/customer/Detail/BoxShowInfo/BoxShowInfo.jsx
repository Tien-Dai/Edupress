import BookIcon from "../../../../components/icons/BookIcon";
import ClockIcon from "../../../../components/icons/ClockIcon"
import GraduationIcon from "../../../../components/icons/GraduationIcon"
import SignalIcon from "../../../../components/icons/SignalIcon";
import BoxCourseInfoCard from "./BoxCourseInfoCard";
import { message, Modal, Spin } from "antd";
import { useNavigate } from "react-router-dom";
const BoxShowInfo = ({
    showStickyCard,
    showList, 
    loading,
    addToCart,
    adding,
    setAdding,
    user,
    isPurchased
}) => {

    const nav = useNavigate();
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
                course_id: showList._id,
                course_title: showList.course_title,
                price: showList.price,
                image_url: showList.image_url,   
                total_lectures: showList.total_lectures,
            },
            user._id
        );

        setAdding(false);

        ok
            ? message.success("Đã thêm vào giỏ")
            : message.warning("Khóa học đã có trong giỏ!");
    };


    return (
        <div className="w-full bg-[#000000] text-white py-10">
            <div
                className="
                max-w-[1080px] mx-auto w-full
                grid gap-8
                grid-cols-1
                lg:grid-cols-[2fr_1fr]
                relative
                px-4 lg:px-0
                "
            >
                {/* Box Left */}
                <div className="showInfoCourse w-full">
                    {
                        !loading && !showList
                            ? (
                                <div className="flex flex-col gap-3">
                                    <p className="animate-pulse w-full h-[20px] md:h-[25px] lg:h-[30px] bg-[#d8d8d8]"></p>
                                    <p className="animate-pulse w-30 h-[20px] md:h-[25px] lg:h-[30px] bg-[#d8d8d8]"></p>
                                </div>
                            ): (
                                <h1
                                    className="
                                    text-[22px] leading-tight
                                    md:text-[30px]
                                    lg:text-[38px]
                                    font-semibold
                                    "
                                >
                                    {showList?.course_title}
                                </h1>
                            )
                    }

                    <div
                        className="
                        flex flex-wrap items-center gap-x-6 gap-y-3
                        mt-5 text-[14px]
                        md:text-[15px]
                        "
                    >
                        {
                            !loading && !showList
                                ?   <p className="animate-pulse w-15 h-[20px] bg-[#d8d8d8]">

                                    </p>
                                : (
                                    <div className="flex items-center">
                                        <ClockIcon size={18} className="text-[#FF782D]" />
                                        <span className="ml-2">{showList?.duration}</span>
                                    </div>
                                )
                        }
                        {
                            !loading && !showList
                                ?   <p className="animate-pulse w-15 h-[20px] bg-[#d8d8d8]"></p>
                                : (
                                    <div className="flex items-center">
                                        <GraduationIcon size={18} className="text-[#FF782D]" />
                                        <span className="ml-2">{showList?.students}</span>
                                    </div>
                                )
                        }

                        {
                            !loading && !showList
                                ?   <p className="animate-pulse w-15 h-[20px] bg-[#d8d8d8]"></p>
                                : (
                                    <div className="flex items-center">
                                        <BookIcon size={18} className="text-[#FF782D]" />
                                        <span className="ml-2">{showList?.total_lectures}</span>
                                    </div>
                                )
                        }

                        {
                            !loading && !showList
                                ?   <p className="animate-pulse w-15 h-[20px] bg-[#d8d8d8]"></p>
                                : (
                                    <div className="flex items-center">
                                        <SignalIcon size={18} className="text-[#FF782D]" />
                                        <span className="ml-2">Tất cả mức độ</span>
                                    </div>
                                )
                        }
                    </div>
                </div>

                {/* Box Right */}
                <div className="w-full relative hidden lg:block">
                    {!showStickyCard && (
                        <div
                            className="
                                lg:absolute lg:top-0
                                w-full transition-all duration-300
                            "
                        >
                            <BoxCourseInfoCard 
                                showList={showList} 
                                loading={loading} 
                                adding={adding} 
                                handleAddToCart={handleAddToCart}
                                isPurchased={isPurchased}
                            />
                        </div>
                    )}
                </div>
                <div className="w-full relative block lg:hidden">
                    <BoxCourseInfoCard 
                        showList={showList} 
                        loading={loading} 
                        adding={adding} 
                        handleAddToCart={handleAddToCart}
                        isPurchased={isPurchased}
                    />
                </div>
            </div>
        </div>

    );
}
export default BoxShowInfo;