import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const Button = ({ label, onClick, type = "cancel", selectOptions }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonRef = useRef<any>(null);

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

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
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
