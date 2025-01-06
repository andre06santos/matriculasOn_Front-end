import "./styles.css";
import spinner from "../../../public/images/spinner.gif";

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={spinner} alt="loading" />
    </div>
  );
};

export { Spinner };
