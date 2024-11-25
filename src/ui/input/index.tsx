import Select from "react-select";
import "./styles.css";

const Input = ({
  label,
  type = "text",
  variant,
  selectOptions,
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
          defaultValue={selectOptions[0]}
          isClearable
          isSearchable
          options={selectOptions}
          getOptionValue={(option: any) => `${option["id"]}`}
          getOptionLabel={(option: any) => `${option["text"]}`}
          className="input-select"
        />
      ) : (
        <input type={type} {...rest} className={inputClass} />
      )}
    </div>
  );
};

export { Input };
