import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api";

const useShowCourseAll = ({ page = 1, limit = 10, search = "" }) => {
  return useQuery({
    queryKey: ["courses", page, limit, search],
    queryFn: async () => {
      const res = await api.get("/courses", {
        params: { page, limit, search },
      });
      return res.data;
    },
    keepPreviousData: true,

    staleTime: 10 * 1000,
  });
};

export default useShowCourseAll;
