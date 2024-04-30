import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "../api/client";

export const useFetchClient = () => {
  const { id } = useParams();

  const fetchClientMemo = useCallback(() => fetchClient(id), [id]);

  const {
    data: client,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: fetchClientMemo,
  });

  return { client, isLoading, error };
};
