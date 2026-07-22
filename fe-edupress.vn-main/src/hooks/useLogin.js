import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        "http://localhost:8080/login",
        data
      );
      return res.data;
    },
  });
};

export default useLogin;