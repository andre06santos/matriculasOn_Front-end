import { Button } from "../button";
import "./styles.css";

type ModalProps = {
  message: string;
  onCancel: () => void;
  onDelete: () => void;
};

const Modal = ({ message, onCancel, onDelete }: ModalProps) => {
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
