import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import setAuthHeader from "./useAuthHeader";

export const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      try {
        if (data) {
          if (!data.email) {
            setErrorMessage("Email harus diisi");
            return;
          } else if (!data.password) {
            setErrorMessage("Password harus diisi");
            return;
          }
        }
        setIsLoading(true);
        const res = await axiosInstance.post("auth/login", {
          email: data.email,
          password: data.password,
        });
        const user = {
          token: res.data.token,
          username: res.data.username,
        };
        localStorage.setItem("user", JSON.stringify(user));
        setAuthHeader(user.token);
        setIsLoading(false);
        setErrorMessage("");
        navigate(`/${user.username}/notes`);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage("login error")
        if (error.response.data != undefined) {
          setErrorMessage(error.response.data.msg);
        }
      }
    },
  });

  return { mutate, errorMessage, isLoading };
};
