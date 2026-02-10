import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Input } from "./ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "./ui/field";
import type { ReactNode } from "react";

type inputControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName;
  label: ReactNode;
  description: ReactNode;
  type?: "text" | "number" | "email" | "password" | "tel" | "url";
  className?: string;
  control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"];
};

type inputControlFunction = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: inputControlProps<TFieldValues, TName, TTransformedValues>,
) => ReactNode;

type baseInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = inputControlProps<TFieldValues, TName, TTransformedValues> & {
  children: (
    field: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>["render"]
    >[0]["field"] & {
      "aria-invalid": boolean;
      id: string;
    },
  ) => ReactNode;
};

const BaseInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: baseInputProps<TFieldValues, TName, TTransformedValues>,
) => {
  const { children, control, label, name, description } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldContent className="gap-0.5">
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <FieldDescription>{description}</FieldDescription>
            {children({
              ...field,
              id: field.name,
              "aria-invalid": fieldState.invalid,
            })}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
        </Field>
      )}
    />
  );
};

const InputField: inputControlFunction = ({
  type = "text",
  className = "",
  ...props
}) => {
  return (
    <BaseInput {...props} type={type}>
      {(field) => (
        <Input
          {...field}
          type={type}
          className={className}
          onChange={(e) => {
            if (type === "number") {
              const value = e.target.value;
              field.onChange(value === "" ? undefined : Number(value));
            } else {
              field.onChange(e.target.value);
            }
          }}
          value={field.value ?? ""}
        />
      )}
    </BaseInput>
  );
};

export default InputField;
