import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import "./styles.css";
import { ChangeEvent, useState } from "react";
import {
  handleChangeDescription,
  handleChangeRole,
} from "../../../modules/permissionsFormValidation";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { Spinner } from "../../../ui/spinner";
import { toast } from "react-toastify";
import {
  ChangeEventType,
  FormEventType,
  PermissionsType,
} from "../../../modules/administradores/infrastructure/types";

const CreatePermission = () => {
  const { addPermission } = useAdmin();
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (e: FormEventType) => {
    e.preventDefault();

    if (errorMessages.length > 0) {
      const firstError = Object.values(errorMessages[0])[0];
      toast(`${firstError}`, {
        position: "top-center",
        type: "error",
      });
    } else {
      const newPermission: PermissionsType = {
        role,
        descricao,
      };

      try {
        setIsLoading(true);
        await addPermission(newPermission);
        setIsLoading(false);
        toast("Permissão cadastrada com sucesso!", {
          position: "top-center",
          type: "success",
        });
        navigate("/permissoes");
      } catch (error) {
        setIsLoading(false);
        toast("Ocorreu um erro ao tentar cadastrar o curso!", {
          position: "top-center",
          type: "error",
        });
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
            autoFocus
            onChange={(e: ChangeEventType) =>
              handleChangeRole(e.target.value, setRole)
            }
          />
          <Input
            label="Descrição"
            required
            value={descricao}
            onChange={(e: ChangeEventType) =>
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
