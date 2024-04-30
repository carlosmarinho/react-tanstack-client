// useFormSubmit.ts
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitAddClient } from "../api/client";
// Hook for adding a client
export const useAddClient = () => {
  const submitClient = useCallback(submitAddClient, []);

  const {
    mutate: addClient,
    error: submitError,
    isSuccess: submitSuccess,
    isPending: isSubmitting,
  } = useMutation({
    mutationFn: submitClient,
  });

  return { addClient, submitSuccess, submitError, isSubmitting };
};

export default useAddClient;
