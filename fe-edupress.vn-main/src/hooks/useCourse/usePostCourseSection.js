import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/api.js";

const usePostCourseSection = () => {
  return useMutation({
    mutationKey: ["CourseSection"],
    mutationFn: async ({ courseId, payload }) => {
      const res = await api.post(`/courses/${courseId}/course-sections`, payload);
      return res.data;
    },
  });
};

export default usePostCourseSection;