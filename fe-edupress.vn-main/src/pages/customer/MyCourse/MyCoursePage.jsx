import { useEffect, useState } from "react";
import axios from "axios";

import BoxShowCourseCard from "./CourseCard/BoxShowCourseCard";
import useAuth from "../../../hooks/useAuth";

const MyCoursePage = () => {
  const { user } = useAuth();

  const [myCoursesList, setMyCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      if (!user?._id) {
        setMyCoursesList([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `http://localhost:8080/enrollments/user/${user._id}`
        );

        console.log("ENROLLMENT RESPONSE:", res.data);

        const enrollments = res.data?.data || [];

        const activeEnrollments = enrollments.filter(
          (item) => item.status === "active"
        );
        const courses = activeEnrollments.map((item) => {
            if (!item.course_id) {
              return null;
            }

            if (typeof item.course_id === "object") {
              return {
                ...item.course_id,

                enrollment_id: item._id,

                progress: item.progress || 0,

                completed_lectures:
                  item.completed_lectures || [],

                enrollment_status: item.status,
              };
            }

            return null;
          })
          .filter(Boolean);

        console.log("MY COURSES:", courses);

        setMyCoursesList(courses);
      } catch (err) {
        console.error(
          "FETCH MY COURSES ERROR:",
          err
        );

        console.error(
          "SERVER RESPONSE:",
          err?.response?.data
        );

        setError(
          err?.response?.data?.message ||
            "Không thể tải khóa học của bạn"
        );

        setMyCoursesList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [user?._id]);

  return (
    <div className="mt-[50px]">

      {/* HEADER */}

      <div className="h-[110px] bg-black">
        <div
          className="
            max-w-[1080px]
            mx-auto
            h-full
            flex
            items-center
            px-[15px]
            lg:px-0
          "
        >
          <div className="flex flex-col items-start gap-2">

            <h1
              className="
                text-[14px]
                md:text-[16px]
                lg:text-[28px]
                font-semibold
                text-white
              "
            >
              Khóa học của tôi
            </h1>

            <div className="w-[100px]">
              <hr className="border border-white w-full" />
            </div>

          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div
        className="
          max-w-[1080px]
          mx-auto
          mt-5
          px-[15px]
          lg:px-0
          min-h-[300px]
        "
      >

        {error ? (
          <div
            className="
              text-center
              py-10
              text-red-500
            "
          >
            {error}
          </div>
        ) : (
          <BoxShowCourseCard
            showList={myCoursesList}
            loading={loading}
          />
        )}

      </div>

    </div>
  );
};

export default MyCoursePage;