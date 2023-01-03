import { useMutation } from "react-query";
import { request } from "../utils/request";

const loginUser = (credentials) => {
  return request({ url: "/login", method: "post", data: credentials });
};

export const useLoginUser = (onSuccess, onError) => {
  return useMutation(loginUser, {
    onSuccess,
    onError,
  });
};

const registerUser = (credentials) => {
  return request({
    url: "/register",
    method: "post",
    data: credentials,
  });
};

export const useRegisterUser = (onSuccess) => {
  return useMutation(registerUser, {
    onSuccess,
    onError: (error) => error,
  });
};
