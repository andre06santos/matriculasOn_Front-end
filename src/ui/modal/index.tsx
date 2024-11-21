import { Button } from "../button";
import "./styles.css"


const Modal = ({ text }: any) => {
    return (
        <div className="modal-bg">
            <div className="modal">
                <p className="modal-text">{text}</p>
                <div className="modal-buttons">
                    <Button label="Cancelar" type="cancel" />
                    <Button label="Excluir" type="danger" />
                </div>
            </div>
        </div>
    )
}

export { Modal };