
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/api";
import { message } from "antd";

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/users", payload);
      return res.data;
    },
    onSuccess: () => {
      message.success("Thêm tài khoản thành công!");
      queryClient.invalidateQueries({ queryKey: ["AllUsers"] });
    },
    onError: (error) => {
      message.error(
        error?.response?.data?.message || "Thêm tài khoản thất bại"
      );
    },
  });
};

export default useCreateUser;