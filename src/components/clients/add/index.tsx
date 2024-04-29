import useFormSubmit from "../../../hooks/clientSubmitHooks";

import ClientForm from "../form/ClientForm";

const AddClient = () => {
  const { addClient, submitSuccess, submitError, isSubmitting } =
    useFormSubmit();

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
