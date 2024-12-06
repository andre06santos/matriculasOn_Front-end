import Select from "react-select";
import "./styles.css";

const Input = ({
  label,
  type = "text",
  variant,
  selectOptions,
  readonly,
  ...rest
}: any) => {
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

  const { onChange } = { ...rest };

  return (
    <div className="input-component">
      {label && <label>{label}</label>}

      {selectOptions ? (
        <Select
          isSearchable
          options={selectOptions}
          placeholder="Escolha uma opção"
          noOptionsMessage={() => "Nenhuma opção encontrada!"}
          getOptionValue={(option: any) => option["value"]}
          getOptionLabel={(option: any) => option["text"]}
          className="input-select"
          onChange={onChange}
        />
      ) : (
        <input type={type} {...rest} className={inputClass} readOnly={readonly} />
      )}
    </div>
  );
};

export { Input };
