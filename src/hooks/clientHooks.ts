import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { TypeClient } from "../types/clientSchema";

export const useClient = () => {
  const queryClient = useQueryClient();

  const fetchClients = useCallback(async () => {
    const response = await fetch("/api/clients");
    return (await response.json()) as TypeClient[];
  }, []);

  const deleteClient = useCallback(async (id: number) => {
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Erro ao deletar: ${(error as Error).message}`);
    }
  }, []);

  const {
    data: clients,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  const { mutate: removeClient, error: deleteError } = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  return { clients, removeClient, isLoading, error, deleteError };
};
