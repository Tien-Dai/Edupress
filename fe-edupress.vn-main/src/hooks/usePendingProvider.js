import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";

const usePendingProviders = () => {
  return useQuery({
    queryKey: ["PendingProviders"],
    queryFn: async () => {
      const res = await api.get("/admin/providers/pending");
      return res.data.providers;
    },
  });
};

export default usePendingProviders;