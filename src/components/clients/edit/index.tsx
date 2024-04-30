import { useCallback } from "react";
import useFormSubmit from "../../../hooks/clientSubmitHooks";

import ClientForm from "../form/ClientForm";
import { TypeClient } from "../../../types/clientSchema";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const EditClient = () => {
  const { id } = useParams();

  const { addOrEditClient, submitSuccess, submitError, isSubmitting } =
    useFormSubmit();

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

  const onSubmit = (data: unknown) => {
    addOrEditClient(data);
  };

  console.log("\n\n***\n : ", "\n***\n");

  return (
    <ClientForm
      client={client}
      actionClient={onSubmit}
      submitSuccess={submitSuccess}
      submitError={submitError}
      isSubmitting={isSubmitting}
    />
  );
};

export default EditClient;
