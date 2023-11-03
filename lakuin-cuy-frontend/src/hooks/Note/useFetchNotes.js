/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchNotes = (username) => {
  const [starNotes, setStarNotes] = useState(null);
  const [notStarNotes, setNotStarNotes] = useState(null);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const res = await axiosInstance.get(`/todos/${username}`);
      return res;
    },
    refetchOnWindowFocus: false,
  });
  
  useEffect(() => {
    setStarNotes(data?.data.filter((note) => note.star));
    setNotStarNotes(data?.data.filter((note) => !note.star));
  }, [data]);

  return { data, isLoading, starNotes, notStarNotes };
};
