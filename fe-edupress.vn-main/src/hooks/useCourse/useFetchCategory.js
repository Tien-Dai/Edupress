
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchCategory = () => {
  return useQuery({
    queryKey: ["Category"],
    queryFn: async () => {
      const res = await axios.get("https://edupress-be.onrender.com/categories");
      return res.data; 
    },
    keepPreviousData: true,
  });
};

export default useFetchCategory;