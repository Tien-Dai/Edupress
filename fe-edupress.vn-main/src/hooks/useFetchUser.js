
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";

const useFetchUser = () => {
  return useQuery({
    queryKey: ["AllUsers"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data.users;
    },
  });
};

export default useFetchUser;