import { useAddClient } from "../../../hooks/useAddClient";

import ClientForm from "../form/ClientForm";

const AddClient = () => {
  const { addClient, submitSuccess, submitError, isSubmitting } =
    useAddClient();

  const onSubmit = (data: unknown) => {
    addClient(data);
  };

  return (
    <ClientForm
      actionClient={onSubmit}
      submitSuccess={submitSuccess}
      submitError={submitError}
      isSubmitting={isSubmitting}
    />
  );
};

export default AddClient;
