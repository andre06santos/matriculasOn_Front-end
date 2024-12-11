import "./styles.css";

const NotFound = ({ message }: any) => {
  return (
    <div className="notfound-container">
      <img src="./not_found.jpg" />
      <p>{message}</p>
    </div>
  );
};

export { NotFound };
