import { useMutation } from "react-query";
import { useState } from "react";
import { POST_FORM_DATA } from "../constants/queryKeys";
import postData from "../services/PostForm";

export const usePostFormData = () => {
  const [message, setMessage] = useState("");

  const { data, isLoading, error, mutate, isSuccess, status } = useMutation({
    mutationKey: POST_FORM_DATA,
    mutationFn: postData,
    onSuccess: () => {
      setMessage("Successful");
    },
    onError: (error) => {
      setMessage(error.message || "Something went wrong");
    },
    onMutate: () => {
      setMessage("");
    },
  });

  return {
    data,
    isLoading,
    error,
    isSuccess,
    status,
    message,
    mutate,
  };
};