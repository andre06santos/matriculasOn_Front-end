import { Button } from "../button";
import "./styles.css";

const Modal = ({ message, cancelOnClick }: any) => {
  return (
    <div className="modal-bg">
      <div className="modal">
        <p className="modal-text">{message}</p>
        <div className="modal-buttons">
          <Button label="Cancelar" type="cancel" onClick={cancelOnClick} />
          <Button label="Excluir" type="danger" />
        </div>
      </div>
    </div>
  );
};

export { Modal };
