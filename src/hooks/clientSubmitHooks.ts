// useFormSubmit.ts
import { useCallback } from "react";
import { ClientSchema } from "../types";
import { useMutation } from "@tanstack/react-query";

const useFormSubmit = () => {
  const submitClient = useCallback(async (data: unknown) => {
    try {
      ClientSchema.parse(data);
      const response = await fetch("/api/clients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Validation error:", error);
    }
  }, []);

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

export default useFormSubmit;
