import "./styles.css";

type NotFoundProps = {
  message: string;
};

const NotFound = ({ message }: NotFoundProps) => {
  return (
    <div className="notfound-container">
      <img src="./not_found.jpg" />
      <p>{message}</p>
    </div>
  );
};

export { NotFound };
