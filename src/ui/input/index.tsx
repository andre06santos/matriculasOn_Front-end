import Select from "react-select";
import "./styles.css";
import React from "react";

const Input = React.forwardRef(
  (
    {
      label,
      type = "text",
      variant,
      selectOptions,
      onChange,
      value,
      ...rest
    }: any,
    ref
  ) => {
    const inputCollors: any = {
      bgNeutral: "bg-neutral",
      bgInfo: "bg-info",
      bgSuccess: "bg-success",
    };

    const inputClass = `input ${
      type === "reset" || type === "submit"
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
          />
        ) : (
          <input
            type={type}
            className={inputClass}
            onChange={onChange}
            value={value}
            ref={ref}
            {...rest}
          />
        )}
      </div>
    );
  }
);

export { Input };
