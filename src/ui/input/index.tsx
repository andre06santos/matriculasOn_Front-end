import React, { useState } from "react";
import Select from "react-select";
import "./styles.css";

type inputTypeProps =
  | "text"
  | "password"
  | "email"
  | "number"
  | "reset"
  | "submit";

type InputProps = {
  label?: string;
  type?: inputTypeProps;
  variant?: "bgNeutral" | "bgInfo" | "bgSuccess";
  selectOptions?: { value: string; label: string }[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  optionValue?: string | { label: string; value: string };
  isLoading?: boolean;
  loadMoreText?: string;
  onLoadMore?: () => void;
  showLoadMore?: boolean;
  allCoursesLoaded?: boolean;
  totalElements?: number;
  [key: string]: any;
};

const Input = React.forwardRef<
  HTMLInputElement | HTMLSelectElement,
  InputProps
>(
  (
    {
      label,
      type = "text",
      variant,
      selectOptions,
      onChange,
      isPassword,
      optionValue,
      isLoading = false,
      loadMoreText = "Carregar mais cursos...",
      onLoadMore,
      showLoadMore = false,
      allCoursesLoaded = false,
      totalElements = 0,
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

    const inputClass = `input ${inputType === "reset" || inputType === "submit"
      ? `${inputCollors[variant]} input-button`
      : "input-text"
      }`;

    const optionsWithLoadMore = selectOptions
      ? [
        ...selectOptions,
        ...(showLoadMore && selectOptions.length < totalElements
          ? [
            {
              value: "load-more",
              label: allCoursesLoaded
                ? "Todos os cursos já foram carregados"
                : loadMoreText,
            },
          ]
          : []),
      ]
      : [];

    const handleLoadMore = () => {
      if (onLoadMore) {
        onLoadMore();
      }
    };

    const renderOptionLabel = (e: any) => {
      if (e.value === "load-more") {
        return (
          <div
            style={{
              color: "black",
              cursor: "pointer",
            }}
            onClick={handleLoadMore}
          >
            {e.label}
          </div>
        );
      }
      return e.label;
    };

    const selectedOption = optionValue && optionValue.hasOwnProperty('value') && optionValue['value'] ? optionValue : null;
    return (
      <div className="input-component">
        {label && <label>{label}</label>}

        {selectOptions ? (
          <div className="input-select-container">
            <Select
              options={optionsWithLoadMore}
              placeholder="Escolha uma opção"
              noOptionsMessage={() => "Nenhuma opção encontrada!"}
              className="input-select"
              value={selectedOption}
              onChange={onChange}
              {...rest}
              getOptionLabel={renderOptionLabel}
              getOptionValue={(e) => (e.value === "load-more" ? "" : e.value)}
            />
          </div>
        ) : (
          <>
            <div className={isPassword ? "input-container" : ""}>
              <input
                id="input"
                type={inputType}
                className={isPassword ? "password-input" : inputClass}
                onChange={onChange}
                value={optionValue}
                ref={ref as React.RefObject<HTMLInputElement>}
                autoComplete="off"
                {...rest}
              />
              {isPassword ? (
                <img
                  src="/visibility_off.svg"
                  onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                    if (inputType === "password") {
                      setInputType("text");
                      e.currentTarget.src = "/visibility.svg";
                    } else {
                      setInputType("password");
                      e.currentTarget.src = "/visibility_off.svg";
                    }
                  }}
                  alt="toggle visibility"
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
