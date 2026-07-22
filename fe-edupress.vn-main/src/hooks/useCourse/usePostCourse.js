import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/api.js";

const usePostCourse = () => {
  return useMutation({
    mutationKey: ["Course"],
    mutationFn: async (payload) => {
      const res = await api.post("/courses", payload);
      return res.data;
    },
  });
};

export default usePostCourse;