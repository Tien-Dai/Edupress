import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import ArrowLeftIcon from "../../components/icons/ArrowLeftIcon";
import useFetchData from "../../api/useFetchData";
import BoxInstructions from "../customer/Detail/BoxShowTabsCourse/BoxInstructions/BoxInstructions";

const LearningPage = () => {
  const { _id } = useParams();

  const { data: courses = [], loading: loadingCourses } =
    useFetchData("courses");

  const { data: sections = [], loading: loadingSections } =
    useFetchData("coursesections");

  const { data: lectures = [], loading: loadingLectures } =
    useFetchData("lectures");

  // ===== Lấy khóa học =====
  const showList = useMemo(() => {
    return courses.find(
      (item) => String(item._id) === String(_id)
    );
  }, [courses, _id]);

  // ===== Ghép section và lecture =====
  const courseData = useMemo(() => {
    if (!showList) return null;

    const sectionList = sections
      .filter((section) => {
        return String(section.course_id) === String(showList._id);
      })
      .map((section) => {
        const lectureList = lectures.filter((lecture) => {
          return (
            String(lecture.section_id) ===
            String(section._id)
          );
        });

        return {
          ...section,
          lectures: lectureList,
          lecture_count: lectureList.length,
        };
      });

    console.log("COURSE:", showList);
    console.log("SECTION:", sectionList);
    console.log("LECTURE:", lectures);

    return {
      ...showList,
      sections: sectionList,
    };
  }, [showList, sections, lectures]);

  // ===== Video =====
  const [currentVideo, setCurrentVideo] = useState("");

  useEffect(() => {
    if (
      !currentVideo &&
      courseData?.sections?.length > 0 &&
      courseData.sections[0].lectures?.length > 0
    ) {
      setCurrentVideo(
        courseData.sections[0].lectures[0].vid_lectures_url || ""
      );
    }
  }, [courseData]);

  if (
    loadingCourses ||
    loadingSections ||
    loadingLectures
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <div className="bg-black text-white px-5 py-4 flex justify-between items-center">

        <div className="flex items-center gap-4">

          <Link to="/">
            <img
              src="/images/logo.png"
              className="h-10"
              alt=""
            />
          </Link>

          <h1 className="text-lg font-semibold">
            {showList?.course_title}
          </h1>

        </div>

        <Link
          to="/my-course"
          className="bg-[#FF782D] px-4 py-2 rounded text-white"
        >
          <div className="flex items-center gap-2">
            <ArrowLeftIcon size={18} />
            Thoát
          </div>
        </Link>

      </div>

      {/* BODY */}
      <div className="flex">

        {/* VIDEO */}
        <div className="flex-1 lg:pr-[390px]">

          <div className="bg-black aspect-video flex items-center justify-center">

            {currentVideo ? (
              <iframe
                className="w-full h-[600px]"
                src={currentVideo}
                title="Video"
                allowFullScreen
              />
            ) : (
              <div className="text-white">
                Chọn bài học để bắt đầu
              </div>
            )}

          </div>

        </div>

        {/* SIDEBAR */}
        <div className="fixed right-0 top-[72px] w-[380px] h-[calc(100vh-72px)] overflow-y-auto border-l bg-white p-4">

          <h3 className="text-lg font-bold mb-4">
            Nội dung khóa học
          </h3>

          <BoxInstructions
            showList={courseData}
            onSelectLecture={(url) => setCurrentVideo(url)}
          />

        </div>

      </div>

    </div>
  );
};

export default LearningPage;