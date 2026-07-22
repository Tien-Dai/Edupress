import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/api.js";

const usePostCourseLecture = () => {
  return useMutation({
    mutationKey: ["CourseLecture"],
    mutationFn: async ({ sectionId, payload }) => {
      const res = await api.post(`/sections/${sectionId}/lectures`, payload);
      return res.data;
    },
  });
};

export default usePostCourseLecture;