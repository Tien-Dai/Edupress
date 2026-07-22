
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import BoxCateGory from "./BoxCategory";
import ChevronLeftIcon from "../../../../components/icons/ChevronLeftIcon";
import ChevronRightIcon from "../../../../components/icons/ChevronRightIcon";

const skeletonItems = Array.from({ length: 12 }, (_, i) => ({
    id: `skeleton-${i}`,
    isSkeleton: true,
}));

const SwiperCategory = ({ categories, loading }) => {
    const renderData = loading || !categories || categories.length === 0
        ? skeletonItems
        : categories;


  return (
        <div className="relative">
            {/* Custom arrows */}
            <button 
                className="
                    cate-prev absolute left-[-5px] lg:-left-5 top-1/2 -translate-y-1/2 z-10 border-[1px] border-[#E0E0E0]
                    w-10 h-10 bg-white rounded-full shadow hidden lg:flex items-center justify-center 
                    hover:bg-[#FF782D] hover:text-white hover:opacity-60 transition cursor-pointer
                "
            >
                <ChevronLeftIcon size={20} />
            </button>

            <button 
                className="
                cate-next absolute right-[-5px] lg:-right-5 top-1/2 -translate-y-1/2 z-10 border-[1px] border-[#E0E0E0] 
                w-10 h-10 bg-white rounded-full shadow hidden lg:flex items-center justify-center
                hover:bg-[#FF782D] hover:text-white hover:opacity-60 transition cursor-pointer
                "
            >
                <ChevronRightIcon size={20} />
            </button>

         <Swiper
            modules={[Navigation, Grid]}
            navigation={{
                prevEl: ".cate-prev",
                nextEl: ".cate-next",
            }}
            spaceBetween={12}
            grabCursor
            breakpoints={{
                1024: {
                slidesPerView: 6,
                slidesPerGroup: 6,
                grid: {
                    rows: 1,
                },
                },
                768: {
                slidesPerView: 4.5,
                slidesPerGroup: 4,
                grid: {
                    rows: 1,
                },
                },
                480: {
                slidesPerView: 3.5,
                slidesPerGroup: 3,
                grid: {
                    rows: 1,
                },
                },
                0: {
                slidesPerView: 3.5,
                slidesPerGroup: 2, // 🔥 QUAN TRỌNG
                grid: {
                    rows: 2,
                    fill: "row",
                },
                },
            }}
            >
                {
                    renderData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <BoxCateGory item={item} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    );
}

export default SwiperCategory;

