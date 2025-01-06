import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import "./styles.css";
import { useState } from "react";
import {
  handleChangeDescription,
  handleChangeRole,
} from "../../../modules/permissionsFormValidation";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { Spinner } from "../../../ui/spinner";

const CreatePermission = () => {
  const { addPermission } = useAdmin();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [descricao, setDescricao] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (errorMessages.length > 0) {
      const firstError = Object.values(errorMessages[0])[0];
      console.log(firstError);
    } else {
      const newPermission = {
        role,
        descricao,
      };

      try {
        setIsLoading(true);
        await addPermission(newPermission);
        setIsLoading(false);
        console.log("Permissão cadastrada com sucesso!");
        navigate("/permissoes");
      } catch (error) {
        setIsLoading(false);
        console.log("Ocorreu um erro ao tentar cadastrar a permissão!");
        console.error((error as Error).message);
      }
    }
  };

  const onClean = (e: any) => {
    e.preventDefault();

    setRole("");
    setDescricao("");
    setErrorMessages([]);
  };

  return (
    <div className="add-page flex-column-gap20">
      {isLoading && <Spinner />}

      <h1>Cadastrar permissão</h1>

      <form
        action=""
        className="form-registration flex-column-gap20"
        onSubmit={onSubmit}
      >
        <div className="form-inputs flex-column-gap20">
          <Input
            label="Role"
            value={role}
            required
            onChange={(e: any) => handleChangeRole(e.target.value, setRole)}
          />
          <Input
            label="Descrição"
            required
            value={descricao}
            onChange={(e: any) =>
              handleChangeDescription(e.target.value, setDescricao)
            }
          />
        </div>

        <div className="form-actions-registration flex-column-gap20">
          <Input
            type="reset"
            variant="bgNeutral"
            value="Limpar"
            onClick={onClean}
          />
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
