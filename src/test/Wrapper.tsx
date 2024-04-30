import { FC, ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ClientFormProps } from "../components/clients/form/BasicClientForm";
import { TypeClient } from "../types/clientSchema";

const Wrapper: FC<{
  children: (props: ClientFormProps) => ReactNode;
}> = ({ children }) => {
  const Wrapper: FC<{
    children: (props: ClientFormProps) => ReactNode;
  }> = ({ children }) => {
    const methods = useForm<TypeClient>();

    return (
      <FormProvider {...methods}>
        {children({
          errors: methods.formState.errors,
          control: methods.control,
        })}
      </FormProvider>
    );
  };

  return <Wrapper>{children}</Wrapper>;
};

export default Wrapper;
