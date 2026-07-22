import { Link } from "react-router-dom";
import { Spin } from "antd";
import PlayIcon from "../../../../components/icons/PlayIcon";

const CourseCard = ({ item, loading }) => {
  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div
        className="
          w-full
          h-[300px]
          rounded-[12px]
          bg-[#d8d8d8]
          animate-pulse
          flex
          items-center
          justify-center
        "
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!item) return null;

  // =========================
  // CHUẨN HÓA DỮ LIỆU COURSE
  // =========================

  // Trường hợp item chính là course
  // hoặc item.course_id đã được populate
  const courseId =
    item?._id ||
    item?.course_id?._id ||
    item?.course_id;

  const courseTitle =
    item?.course_title ||
    item?.title ||
    item?.course_name ||
    "Khóa học";

  const courseImage =
    item?.image_url ||
    item?.image ||
    item?.thumbnail ||
    "/images/default-course.png";

  // Nếu không lấy được ID thì không cho vào trang học
  const learningUrl = courseId
    ? `/learning/${courseId}`
    : "#";

  return (
    <div className="w-full">
      <div className="group cursor-pointer">

        {/* IMAGE */}
        <Link
          to={learningUrl}
          className="
            relative
            overflow-hidden
            rounded-[10px]
            block
          "
        >
          <img
            src={courseImage}
            alt={courseTitle}
            onError={(e) => {
              e.currentTarget.src =
                "/images/default-course.png";
            }}
            className="
              w-full
              h-[180px]
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

          {/* HOVER */}
          <div
            className="
              absolute
              inset-0
              bg-[#7d7d7d47]
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-300
              flex
              items-center
              justify-center
            "
          >
            <div
              className="
                w-14
                h-14
                bg-[#FF782D]
                rounded-full
                flex
                items-center
                justify-center
                scale-75
                group-hover:scale-100
                transition-transform
                duration-300
              "
            >
              <PlayIcon
                className="
                  w-6
                  h-6
                  text-white
                  ml-[2px]
                "
              />
            </div>
          </div>
        </Link>

        {/* COURSE INFO */}
        <div className="mt-3">

          <h3
            className="
              text-base
              font-semibold
              text-gray-900
              line-clamp-2
              min-h-[48px]
            "
          >
            {courseTitle}
          </h3>

          <hr className="border-gray-300 my-2" />

          <Link
            to={learningUrl}
            className="
              text-[#FF782D]
              hover:text-[#d85e1c]
              font-medium
              text-[14px]
              transition
            "
          >
            Bắt đầu khóa học
          </Link>

        </div>
      </div>
    </div>
  );
};

export default CourseCard;