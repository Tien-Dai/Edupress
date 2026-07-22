import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ChevronLeftIcon from "../../../../components/icons/ChevronLeftIcon";
import ChevronRightIcon from "../../../../components/icons/ChevronRightIcon";
import BoxCourse from "../../../../components/BoxCourse";

const SwiperShowCourseRelated = ({
  courses,
  currentCourses,
  loading,
  btnsw,
}) => {

  const isLoadingReal = loading || !courses;

  const courFilter =
    courses
      ?.filter(
        (item) =>
          item.provider === currentCourses?.provider &&
          item._id !== currentCourses?._id
      )
      .sort((a, b) => (b.students || 0) - (a.students || 0))
      .slice(0, 4) || [];

  /* ===== LOADING ===== */
  if (isLoadingReal) {
    return (
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-[300px] rounded-[12px] bg-[#d8d8d8] animate-pulse flex items-center justify-center"
          >
            loading...
          </div>
        ))}
      </div>
    );
  }

  /* ===== EMPTY ===== */
  if (courFilter.length === 0) {
    return (
      <div className="w-full h-[300px] rounded-[12px] bg-[#f2f2f2] flex items-center justify-center">
        <span className="text-[16px] text-[#000000]">
          Hiện không có khóa học liên quan
        </span>
      </div>
    );
  }

  /* ===== DATA ===== */
  return (
    <div className="relative">

      <button className={`${btnsw}-prev absolute left-0 top-1/2 -translate-y-1/2 z-10`}>
        <ChevronLeftIcon size={20} />
      </button>

      <button className={`${btnsw}-next absolute right-0 top-1/2 -translate-y-1/2 z-10`}>
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
        breakpoints={{
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          480: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          0: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
      >
        {courFilter.map((item) => (
          <SwiperSlide key={item._id}>
            <BoxCourse item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperShowCourseRelated;