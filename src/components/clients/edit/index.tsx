import useFormSubmit from "../../../hooks/clientSubmitHooks";

import ClientForm from "../form/ClientForm";
import Loading from "../../common/Loading";
import { useFetchClient } from "../../../hooks/fetchClientHook";

const EditClient = () => {
  const { client, isLoading, error } = useFetchClient();

  const { addOrEditClient, submitSuccess, submitError, isSubmitting } =
    useFormSubmit();

  const onSubmit = (data: unknown) => {
    addOrEditClient(data);
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
