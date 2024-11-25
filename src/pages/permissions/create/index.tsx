import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import "./styles.css";

const CreatePermission = () => {
  return (
    <div className="add-page flex-column-gap20">
      <h1>Cadastrar permissão</h1>

      <form action="" className="form flex-column-gap20">
        <div className="form-inputs flex-column-gap20">
          <Input label="Role" />
          <Input label="Descrição" />
        </div>

        <div className="form-buttons">
          <Input type="reset" variant="bgNeutral" value="Limpar" />
          <Link to="/permissoes">
            <Button label="Cancelar" />
          </Link>
          <Input type="submit" variant="bgSuccess" value="Cadastrar" />
        </div>
      </form>
    </div>
  );
};

export { CreatePermission };
