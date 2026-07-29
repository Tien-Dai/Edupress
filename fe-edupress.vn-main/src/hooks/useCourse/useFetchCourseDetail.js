import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchCourseDetail = (courseId) => {
  return useQuery({
    queryKey: ["courses", courseId],
    queryFn: async () => {
      const res = await axios.get(
        `https://edupress-be.onrender.com/courses/${courseId}`
      );
      return res.data;
    },
    enabled: !!courseId, // chỉ fetch khi có id
  });
};

export default useFetchCourseDetail;