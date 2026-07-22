import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/api.js";

const usePostCourseRequest = () => {
  return useMutation({
    mutationKey: ["CourseRequest"],
    mutationFn: async ({ courseId, payload }) => {
      const res = await api.post(
        `/courses/${courseId}/requests`,
        payload
      );
      return res.data;
    },
  });
};

export default usePostCourseRequest;
