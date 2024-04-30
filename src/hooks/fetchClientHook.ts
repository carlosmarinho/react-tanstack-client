import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { TypeClient } from "../types/clientSchema";

export const useFetchClient = () => {
  const { id } = useParams();

  const fetchClient = useCallback(async () => {
    const response = await fetch(`/api/clients/${id}`);
    return (await response.json()) as TypeClient;
  }, [id]);

  const {
    data: client,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["client"],
    queryFn: fetchClient,
  });

  return { client, isLoading, error };
};
