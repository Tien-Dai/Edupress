import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api";

const useGetAllCourse = () => {
  return useQuery({
    queryKey: ["featured-courses"],
    queryFn: async () => {
      const res = await api.get("/courses/featured");
      return res.data; 
    },
  });
};

export default useGetAllCourse;