import Select from "react-select";
import "./styles.css";

const Input = ({
  label,
  type = "text",
  text = "Escolha uma opção",
  variant,
  selectOptions,
  readOnly,
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
          placeholder={text}
          noOptionsMessage={() => "Nenhuma opção encontrada!"}
          getOptionValue={(option: any) => option["value"]}
          getOptionLabel={(option: any) => option["text"]}
          className="input-select"
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          {...rest}
          className={inputClass}
          readOnly={readOnly}
        />
      )}
    </div>
  );
};

export { Input };
