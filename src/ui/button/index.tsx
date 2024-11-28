import { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const Button = ({ label, onClick, type = "cancel", selectOptions }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const buttonClasses: any = {
    success: "btn-success",
    cancel: "btn-cancel",
    danger: "btn-danger",
  };

  const buttonClass = `button ${buttonClasses[type]} ${
    selectOptions && "select"
  }`;

  const handleChangeExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="button-component">
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

      {isExpanded && (
        <ul className="button-select">
          {selectOptions.map((option: any, index: any) => (
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
