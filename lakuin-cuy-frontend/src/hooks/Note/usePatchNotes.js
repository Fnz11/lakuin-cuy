import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const usePatchNotes = () => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const { title, body, time, category, star, color, _id, username } = data;
      const res = await axiosInstance.patch(`/todos/${username}/${_id}`, {
        title,
        body,
        time,
        category,
        star,
        color,
      });
      return res;
    },
  });
  return { mutate };
};
