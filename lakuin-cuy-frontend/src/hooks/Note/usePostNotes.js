import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const usePostNotes = () => {
    const { mutate } = useMutation({
        mutationFn: async ( data ) => {
          const {title, body, time, category, color, username} = data;
          const res = await axiosInstance.post(`/todos/${username}`, {
            title,
            body,
            time,
            category,
            color,
          });
          return res;
        },
      });
      return mutate
} 