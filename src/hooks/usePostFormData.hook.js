import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { POST_FORM_DATA } from "../constants/queryKeys";
import postData from "../services/PostForm";

export const usePostFormData = () => {
  const [message, setMessage] = useState("");

  const { data, isLoading, error, mutate, isSuccess, status } = useMutation({
    mutationKey: [POST_FORM_DATA],
    mutationFn: postData,
    onSuccess: () => {
      setMessage("Successful");
      toast.success("Data submitted successfully");
    },
    onError: (error) => {
      setMessage(error.message || "Something went wrong");
      toast.error("Submission failed");
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
