// useFormSubmit.ts
import { useState } from "react";
import { ClientSchema } from "../types";

const useFormSubmit = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const onSubmit = async (data: unknown) => {
    try {
      ClientSchema.parse(data);
      const response = await fetch("/api/clients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(true);
    }
  };

  return { onSubmit, submitSuccess, submitError, isLoading: false };
};

export default useFormSubmit;
