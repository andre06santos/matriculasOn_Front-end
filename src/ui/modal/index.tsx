import "./styles.css"

const Modal = ({ text }: any) => {
    return (
        <div className="modal-bg">
            <div className="modal">
                <p className="modal-text">{text}</p>
                <div className="modal-buttons">
                    <button>CANCELAR</button>
                    <button>EXCLUIR</button>
                </div>
            </div>
        </div>
    )
}

export { Modal };