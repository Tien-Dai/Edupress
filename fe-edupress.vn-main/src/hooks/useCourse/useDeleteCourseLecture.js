// hooks/useCourse/useDeleteCourseLecture.js
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/api.js";

const useDeleteCourseLecture = () => {
  return useMutation({
    mutationKey: ["DeleteCourseLecture"],
    mutationFn: async (lectureId) => {
      const res = await api.delete(`/lectures/${lectureId}`);
      return res.data;
    },
  });
};

export default useDeleteCourseLecture;