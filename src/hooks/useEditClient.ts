// useFormSubmit.ts
import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TypeClient } from "../types/clientSchema";
import { submitEditClient } from "../api/client";

export const useEditClient = () => {
  const queryClient = useQueryClient();

  const submitEditClientMemo = useCallback(submitEditClient, []);

  const {
    mutate: editClient,
    error: submitError,
    isSuccess: submitSuccess,
    isPending: isSubmitting,
  } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TypeClient }) =>
      submitEditClientMemo(data, id),
    onSuccess: ({ id }) => {
      // Invalidate and refetch

      queryClient.invalidateQueries({ queryKey: ["client", id.toString()] });
    },
  });

  return { editClient, submitSuccess, submitError, isSubmitting };
};

export default useEditClient;
