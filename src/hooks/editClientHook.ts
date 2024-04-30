// useFormSubmit.ts
import { useCallback } from "react";
import { ClientSchema } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TypeClient } from "../types/clientSchema";

export const useEditClient = () => {
  const queryClient = useQueryClient();

  const submitEditClient = useCallback(async (data: TypeClient, id: number) => {
    try {
      ClientSchema.parse(data);
      const response = await fetch(`/api/clients/${id}`, {
        method: "PUT",
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
    mutate: editClient,
    error: submitError,
    isSuccess: submitSuccess,
    isPending: isSubmitting,
  } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TypeClient }) =>
      submitEditClient(data, id),
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["client", id] });
    },
  });

  return { editClient, submitSuccess, submitError, isSubmitting };
};

export default useEditClient;
