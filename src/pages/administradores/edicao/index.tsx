import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  handleChangeCargo,
  handleChangeCpf,
  handleChangeDepartamento,
  handleChangeEmail,
  handleChangeNome,
} from "../../../modules/alunosAdmFormValidation";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { Spinner } from "../../../ui/spinner";
import { toast } from "react-toastify";
import {
  AdminType,
  ChangeEventType,
  ErrorMessagesType,
  FormEventType,
} from "../../../modules/administradores/infrastructure/types";

const EditAdmin = () => {
  const { state: admin } = useLocation();
  const { editAdmin } = useAdmin();
  const navigate = useNavigate();
  const [cpf, setCpf] = useState<string>(admin.pessoa.cpf);
  const [cargo, setCargo] = useState<string>(admin.pessoa.cargo);
  const [nome, setNome] = useState(admin.pessoa.nome);
  const [email, setEmail] = useState<string>(admin.pessoa.email);
  const [departamento, setDepartamento] = useState<string>(admin.pessoa.departamento);
  const [errorMessages, setErrorMessages] = useState<ErrorMessagesType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEventType) => {
    e.preventDefault();

    if (errorMessages.length > 0) {
      const firstError = Object.values(errorMessages[0])[0];
      toast(`${firstError}`, {
        position: "top-center",
        type: "error",
      });
      return;
    }

    try {
      setIsLoading(true);
      const newAdmin: AdminType = {
        pessoa: {
          cpf,
          cargo,
          nome,
          email,
          departamento,
        }
      };
      await editAdmin({ id: admin.id, newAdmin });
      setIsLoading(false);
      toast("Administrador editado com sucesso!", {
        position: "top-center",
        type: "success",
      });
      navigate("/usuarios");
    } catch (error) {
      setIsLoading(false);
      toast("Ocorreu um erro ao tentar editar o administrador!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    }
  };

  return (
    <div className="flex-column-gap20">
      {isLoading && <Spinner />}

      <h1>Editar administrador</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <Input
            label="CPF"
            type="text"
            required
            value={cpf}
            readOnly
            style={{ opacity: 0.3 }}
            onChange={(e: ChangeEventType) =>
              handleChangeCpf(e.target.value, setErrorMessages, setCpf)
            }
          />
          <Input
            label="Cargo"
            type="text"
            required
            value={cargo}
            onChange={(e: ChangeEventType) =>
              handleChangeCargo(e.target.value, setCargo)
            }
          />
          <Input
            label="Nome"
            type="text"
            required
            value={nome}
            onChange={(e: ChangeEventType) =>
              handleChangeNome(e.target.value, setNome)
            }
          />
          <Input
            label="Email"
            type="text"
            required
            value={email}
            onChange={(e: ChangeEventType) =>
              handleChangeEmail(e.target.value, setErrorMessages, setEmail)
            }
          />
          <Input
            label="Departamento"
            type="text"
            required
            value={departamento}
            onChange={(e: ChangeEventType) =>
              handleChangeDepartamento(e.target.value, setDepartamento)
            }
          />
        </div>
        <div className="form-actions flex-column-gap20">
          <Link to="/usuarios">
            <Button type="cancel" label="Cancelar" />
          </Link>
          <Input type="submit" variant="bgSuccess" value="Salvar" />
        </div>
      </form>
    </div>
  );
};

export { EditAdmin };
