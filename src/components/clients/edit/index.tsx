import ClientForm from "../form/ClientForm";
import Loading from "../../common/Loading";
import { useFetchClient } from "../../../hooks/fetchClientHook";
import useEditClient from "../../../hooks/editClientHook";
import { TypeClient } from "../../../types/clientSchema";

const EditClient = () => {
  const { client, isLoading, error } = useFetchClient();

  const { editClient, submitSuccess, submitError, isSubmitting } =
    useEditClient();

  const onSubmit = (data: TypeClient) => {
    if (client?.id === undefined) {
      console.error("Client ID is undefined");
      return;
    }

    editClient({ data, id: client?.id });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

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
