import useFormSubmit from "../../../hooks/clientSubmitHooks";

import ClientForm from "../form/ClientForm";

const EditClient = () => {
  const { addOrEditClient, submitSuccess, submitError, isSubmitting } =
    useFormSubmit();

  const onSubmit = (data: unknown) => {
    addOrEditClient(data);
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

export default EditClient;
