import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useDeleteNotes = (onSuccess) => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const { username, id, token } = data;
      const config = {
        headers: {
          'Authorization': token
        },
      };
      const res = await axiosInstance.delete(`/todos/${username}/${id}`, config);
      return res;
    },
    onSuccess,
  });
  return { mutate };
};
