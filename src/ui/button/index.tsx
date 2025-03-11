import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

type SelectOption = {
  label: string;
  path: string;
};

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "success" | "cancel" | "danger" | "load";
  selectOptions?: SelectOption[];
};
const Button = ({
  label,
  onClick,
  type = "cancel",
  selectOptions,
}: ButtonProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const buttonClasses: Record<string, string> = {
    success: "btn-success",
    cancel: "btn-cancel",
    danger: "btn-danger",
    load: "btn-load",
  };

  const buttonClass = `button ${buttonClasses[type]} ${
    selectOptions ? "select" : ""
  }`;

  const handleChangeExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="button-component" ref={buttonRef}>
      <button
        onClick={selectOptions ? handleChangeExpanded : onClick}
        className={buttonClass}
        type="button"
      >
        {label}
        {selectOptions && (
          <i className={`fa-solid fa-caret-up ${isExpanded && "selected"}`}></i>
        )}
      </button>

      {isExpanded && selectOptions && (
        <ul className="button-select">
          {selectOptions.map((option, index) => (
            <Link to={option.path} key={index}>
              <li>{option.label}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export { Button };
