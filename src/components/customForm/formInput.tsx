import { SxProps } from "@mui/system";
import { TextField, Box } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";
import React from "react";

interface FormInputProps {
  label: string;
  register?: UseFormRegisterReturn<string> | undefined; // Replace 'any' with the appropriate type
  required?: boolean;
  error: boolean;
  helperText: string | undefined;
  fullWidth?: boolean;
  maxLength?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  children?: React.ReactNode;
  sx?: SxProps;
  noBox?: boolean;
  field?: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    value: string;
  };
}

export const FormInput: React.FC<FormInputProps> = ({
  children,
  label,
  register,
  required = false,
  error,
  helperText,
  fullWidth = true,
  maxLength,
  sx,
  noBox = false,
  inputProps = {},
  field = {},
}) => {
  const textField = (
    <TextField
      label={label}
      {...register}
      required={required}
      error={error}
      helperText={helperText}
      fullWidth={noBox ? false : fullWidth}
      inputProps={{ maxLength, ...inputProps }}
      sx={sx}
      {...field}
    >
      {children}
    </TextField>
  );

  return noBox ? textField : <Box marginBottom={2}>{textField}</Box>;
};
