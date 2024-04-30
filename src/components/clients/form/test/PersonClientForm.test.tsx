import { FC, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { PersonClientForm } from "../PersonClientForm";
import { ClientFormProps } from "../BasicClientForm";
import { TypeClient } from "../../../../types/clientSchema";

describe("PersonClientForm", () => {
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

  it("renders without crashing", () => {
    render(
      <Wrapper>
        {(props) => (
          <PersonClientForm errors={props.errors} control={props.control} />
        )}
      </Wrapper>
    );

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
  });
});
