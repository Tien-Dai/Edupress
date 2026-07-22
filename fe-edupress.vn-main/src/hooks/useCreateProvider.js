import { useMutation } from "@tanstack/react-query";
import { api } from "../api/api";

const useCreateProvider = () => {
  return useMutation({
    mutationKey: ["CreateProvider"],
    mutationFn: async (payload) => {
      const res = await api.post("/providers/register", payload);
      return res.data;
    },
  });
};

export default useCreateProvider;