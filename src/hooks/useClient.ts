import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { deleteClient, fetchClients } from "../api/client";

export const useClient = () => {
  const queryClient = useQueryClient();

  const fetchClientsMemo = useCallback(fetchClients, []);
  const deleteClientMemo = useCallback(deleteClient, []);

  const {
    data: clients,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClientsMemo,
  });

  const { mutate: removeClient, error: deleteError } = useMutation({
    mutationFn: deleteClientMemo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  return { clients, removeClient, isLoading, error, deleteError, refetch };
};
