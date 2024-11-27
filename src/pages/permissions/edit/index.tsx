import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import "./styles.css";

const EditPermission = () => {
  return (
    <div className="add-page flex-column-gap20">
      <h1>Editar permissão</h1>

      <form action="" className="form-edit flex-column-gap20">
        <div className="form-inputs flex-column-gap20">
          <Input label="Role" />
          <Input label="Descrição" />
        </div>

        <div className="form-actions-edit flex-column-gap20" id="removePadding">
          <Input type="reset" variant="bgNeutral" value="Limpar" />
          <Link to="/permissoes">
            <Button label="Cancelar" />
          </Link>
          <Input type="submit" variant="bgSuccess" value="Editar" />
        </div>
      </form>
    </div>
  );
};

export { EditPermission };
