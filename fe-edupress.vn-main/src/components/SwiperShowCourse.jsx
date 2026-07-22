
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ChevronLeftIcon from "./icons/ChevronLeftIcon";
import ChevronRightIcon from "./icons/ChevronRightIcon";
import BoxCourse from "../components/BoxCourse";
import { useState } from "react";


const SwiperShowCourse = ({ courses, loading, btnsw }) => {
  const [slidesView, setSlidesView] = useState(4);
  return (
        <div className="relative">
            {/* Custom arrows */}
            <button 
                className={`
                    ${btnsw}-prev absolute left-[-5px] lg:-left-5 top-1/2 -translate-y-1/2 z-10 border-[1px] border-[#E0E0E0]
                    w-10 h-10 bg-white rounded-full shadow hidden md:flex items-center justify-center 
                    hover:bg-[#FF782D] hover:text-white hover:opacity-60 transition cursor-pointer
                `}
            >
                <ChevronLeftIcon size={20} />
            </button>

            <button 
                className={`
                ${btnsw}-next absolute right-[-5px] lg:-right-5 top-1/2 -translate-y-1/2 z-10 border-[1px] border-[#E0E0E0] 
                w-10 h-10 bg-white rounded-full shadow hidden md:flex items-center justify-center
                hover:bg-[#FF782D] hover:text-white hover:opacity-60 transition cursor-pointer
                `}
            >
                <ChevronRightIcon size={20} />
            </button>

            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: `.${btnsw}-prev`,
                    nextEl: `.${btnsw}-next`,
                }}
                spaceBetween={12}
                grabCursor
                onBreakpoint={(swiper, bp) => setSlidesView(bp.slidesPerView)}
                breakpoints={{
                    1024: { slidesPerView: 4, slidesPerGroup: 4 },
                    768: { slidesPerView: 3, slidesPerGroup: 3 },
                    480: { slidesPerView: 2, slidesPerGroup: 2 },
                    0: { slidesPerView: 2, slidesPerGroup: 2 },
                }}
                >
                {loading || courses.length === 0
                    ? Array.from({ length: slidesView }).map((_, i) => (
                        <SwiperSlide key={`skeleton-${i}`}>
                            <div
                            className="
                                w-full h-[300px] rounded-[12px]
                                bg-[#d8d8d8] animate-pulse
                                flex items-center justify-center
                            "
                            >
                            <span className="text-[16px] text-[#555]">Loading...</span>
                            </div>
                        </SwiperSlide>
                        ))
                    : courses.map((item) => (
                        <SwiperSlide key={item._id}>
                            <BoxCourse item={item} />
                        </SwiperSlide>
                        ))
                }

            </Swiper>

        </div>
    );
}

export default SwiperShowCourse;

