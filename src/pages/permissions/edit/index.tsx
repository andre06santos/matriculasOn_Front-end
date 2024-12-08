import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import "./styles.css";
import { useState } from "react";
import {
  handleChangeDescription,
  handleChangeRole,
} from "../../../modules/permissionsFormValidation";

const EditPermission = () => {
  const { state: permission } = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(permission.role);
  const [descricao, setDescricao] = useState(permission.description);
  const [errorMessages, setErrorMessages] = useState({});

  console.log(permission);
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const listaErros = Object.values(errorMessages).filter(
      (error) => error !== ""
    );

    if (listaErros.length > 0) {
      console.log(listaErros[0]);
    } else {
      navigate("/permissoes");
    }
  };

  const onClean = (e: any) => {
    e.preventDefault();

    setRole("");
    setDescricao("");
    setErrorMessages({});
  };

  return (
    <div className="add-page flex-column-gap20">
      <h1>Editar permissão</h1>

      <form
        action=""
        className="form-edit flex-column-gap20"
        onSubmit={handleSubmit}
      >
        <div className="form-inputs flex-column-gap20">
          <Input
            label="Role"
            value={role}
            required
            onChange={(e: any) =>
              handleChangeRole(e.target.value, setErrorMessages, setRole)
            }
          />
          <Input
            label="Descrição"
            required
            value={descricao}
            onChange={(e: any) =>
              handleChangeDescription(
                e.target.value,
                setErrorMessages,
                setDescricao
              )
            }
          />
        </div>

        <div className="form-actions-edit flex-column-gap20">
          <Input
            type="reset"
            variant="bgNeutral"
            value="Limpar"
            onCLick={onClean}
          />
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
