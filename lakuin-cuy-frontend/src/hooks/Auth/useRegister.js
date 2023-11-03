import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import validator from "validator";

export const useRegister = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      try {
        if (data) {
          if (!data.username) {
            setErrorMessage("Username harus diisi");
            return;
          } else if (!data.email) {
            setErrorMessage("Email harus diisi");
            return;
          } else if (!data.password) {
            setErrorMessage("Password harus diisi");
            return;
          }
          if (!validator.isEmail(data.email)) {
            setErrorMessage("Email tidak valid");
            return;
          }
          if (!validator.isStrongPassword(data.password)) {
            setErrorMessage(
              "Password harus terdiri dari minimal 1 huruf kecil, 1 huruf besar, 1 angka, 1 karakter unik, dan total minimal 8 karakter"
            );
            return;
          }
        }
        setIsLoading(true);
        const res = await axiosInstance.post("auth/register", {
          username: data.username,
          email: data.email,
          password: data.password,
        });
        setIsLoading(false);
        return res;
      } catch (error) {
        setIsLoading(false);
        setErrorMessage("login error");
        if (error.response.data != undefined) {
          setErrorMessage(error.response.data.msg);
        }
      }
    },
  });
  return { errorMessage, mutate, isLoading };
};
