// useFormSubmit.ts
import { useCallback } from "react";
import { ClientSchema } from "../types";
import { useMutation } from "@tanstack/react-query";

const useFormSubmit = () => {
  const submitClient = useCallback(async (data: unknown, id?: string) => {
    try {
      ClientSchema.parse(data);
      const url = id ? `/api/clients/${id}` : "/api/clients/";
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
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
    mutate: addOrEditClient,
    error: submitError,
    isSuccess: submitSuccess,
    isPending: isSubmitting,
  } = useMutation({
    mutationFn: submitClient,
  });

  return { addOrEditClient, submitSuccess, submitError, isSubmitting };
};

export default useFormSubmit;
