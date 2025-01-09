import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import "./styles.css";
import { useState } from "react";
import {
  handleChangeDescription,
  handleChangeRole,
} from "../../../modules/permissionsFormValidation";
import { Spinner } from "../../../ui/spinner";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { toast } from "react-toastify";

const EditPermission = () => {
  const { state: permission } = useLocation();
  const { editPermission } = useAdmin();
  const navigate = useNavigate();

  const [role, setRole] = useState(permission.role);
  const [isLoading, setIsLoading] = useState(false);
  const [descricao, setDescricao] = useState(permission.descricao);
  const [errorMessages, setErrorMessages] = useState([]);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (errorMessages.length > 0) {
      const firstError = Object.values(errorMessages[0])[0];
      toast(`${firstError}`, {
        position: "top-center",
        type: "error",
      });
    }

    try {
      setIsLoading(true);

      const newPermission = {
        role,
        descricao,
      };

      await editPermission({ id: permission.id, newPermission });
      setIsLoading(false);
      toast("Permissão editada com sucesso!", {
        position: "top-center",
        type: "success",
      });
      navigate("/permissoes");
    } catch (error) {
      setIsLoading(false);
      toast("Ocorreu um erro ao tentar editar a permissão!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    }
  };

  return (
    <div className="add-page flex-column-gap20">
      {isLoading && <Spinner />}

      <h1>Editar permissão</h1>

      <form className="form-edit flex-column-gap20" onSubmit={onSubmit}>
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

        <div className="form-actions-edit flex-column-gap20">
          <Link to="/permissoes">
            <Button label="Cancelar" />
          </Link>
          <Input type="submit" variant="bgSuccess" value="Salvar" />
        </div>
      </form>
    </div>
  );
};

export { EditPermission };
