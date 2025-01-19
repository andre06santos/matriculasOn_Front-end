import Select from "react-select";
import "./styles.css";
import React, { useState } from "react";

type inputTypeProps =
  | "text"
  | "password"
  | "email"
  | "number"
  | "reset"
  | "submit"; // Tipos de input permitidos

type InputProps = {
  label?: string;
  type?: inputTypeProps;
  variant?: "bgNeutral" | "bgInfo" | "bgSuccess";
  selectOptions?: { value: string; label: string }[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  value?: string;
  [key: string]: any;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = "text",
      variant,
      selectOptions,
      onChange,
      isPassword,
      value,
      ...rest
    },
    ref
  ) => {
    const [inputType, setInputType] = useState<inputTypeProps>(type);

    const inputCollors: Record<string, string> = {
      bgNeutral: "bg-neutral",
      bgInfo: "bg-info",
      bgSuccess: "bg-success",
    };

    const inputClass = `input ${
      inputType === "reset" || inputType === "submit"
        ? `${inputCollors[variant]} input-button`
        : "input-text"
    }`;

    return (
      <div className="input-component">
        {label && <label>{label}</label>}

        {selectOptions ? (
          <Select
            options={selectOptions}
            placeholder="Escolha uma opção"
            noOptionsMessage={() => "Nenhuma opção encontrada!"}
            className="input-select"
            value={value}
            onChange={onChange}
            {...rest}
          />
        ) : (
          <>
            <div className={isPassword ? "input-container" : ""}>
              <input
                id="input"
                type={inputType}
                className={isPassword ? "password-input" : inputClass}
                onChange={onChange}
                value={value}
                ref={ref}
                autoComplete="off"
                {...rest}
              />

              {isPassword ? (
                <img
                  src="/visibility_off.svg"
                  onClick={(e: any) => {
                    if (inputType === "password") {
                      setInputType("text");
                      e.target.src = "/visibility.svg";
                    } else {
                      setInputType("password");
                      e.target.src = "/visibility_off.svg";
                    }
                  }}
                />
              ) : null}
            </div>
          </>
        )}
      </div>
    );
  }
);

export { Input };
