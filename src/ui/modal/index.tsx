import { Button } from "../button";
import "./styles.css";

const Modal = ({ message, onCancel, onDelete }: any) => {
  return (
    <div className="modal-bg">
      <div className="modal">
        <p className="modal-text">{message}</p>
        <div className="modal-buttons">
          <Button label="Cancelar" type="cancel" onClick={onCancel} />
          <Button label="Excluir" type="danger" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export { Modal };
