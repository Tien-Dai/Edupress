import CourseCard from "./CourseCard";

const BoxShowCourseCard = ({
  showList = [],
  loading,
}) => {

  // Loading
  if (loading) {
    return (
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >
        {[1, 2, 3, 4].map((item) => (
          <CourseCard
            key={item}
            loading={true}
          />
        ))}
      </div>
    );
  }

  // Không có khóa học
  if (!showList.length) {
    return (
      <div
        className="
          w-full
          min-h-[250px]
          flex
          flex-col
          items-center
          justify-center
          text-center
        "
      >
        <p className="text-gray-500 text-[16px]">
          Bạn chưa có khóa học nào.
        </p>

        <p className="text-gray-400 text-[14px] mt-2">
          Hãy đăng ký một khóa học để bắt đầu học.
        </p>
      </div>
    );
  }

  // Hiển thị khóa học
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
      "
    >
      {showList.map((course, index) => (
        <CourseCard
          key={
            course?._id ||
            course?.course_id?._id ||
            index
          }
          item={course}
          loading={false}
        />
      ))}
    </div>
  );
};

export default BoxShowCourseCard;