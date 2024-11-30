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
  const inputClasses: any = {
    text: "input-text",
    password: "input-text",
    reset: "input-button",
    submit: "input-button",
  };

  const inputCollors: any = {
    bgNeutral: "bg-neutral",
    bgInfo: "bg-info",
    bgSuccess: "bg-success",
  };

  const inputClass = `input ${inputClasses[type]} ${inputCollors[variant]}`;

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
          getOptionLabel={(option: any) => option["label"]}
          className="input-select"
        />
      ) : (
        <input type={type} {...rest} className={inputClass} readOnly={readonly} />
      )}
    </div>
  );
};

export { Input };
