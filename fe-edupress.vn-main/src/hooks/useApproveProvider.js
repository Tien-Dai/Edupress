// hooks/useApproveProvider.js
import { useMutation } from "@tanstack/react-query";
import { api } from "../api/api";  

const useApproveProvider = () => {
  return useMutation({
    mutationKey: ["ApproveProvider"],
    mutationFn: async ({ providerId }) => {
      // API duyệt provider
      const res = await api.put(`/admin/providers/${providerId}/approve`);
      return res.data;
    },
  });
};

export default useApproveProvider;