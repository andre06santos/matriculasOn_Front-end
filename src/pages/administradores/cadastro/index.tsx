import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AdminType,
  ChangeEventType,
  FormEventType,
  ErrorMessagesType,
} from "../../../modules/administradores/infrastructure/types";
import {
  handleChangeCargo,
  handleChangeConfSenha,
  handleChangeCpf,
  handleChangeDepartamento,
  handleChangeEmail,
  handleChangeNome,
  handleChangeSenha,
  verificaSenhasIguais,
} from "../../../modules/alunosAdmFormValidation";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { Spinner } from "../../../ui/spinner";
import { toast } from "react-toastify";

const AdministratorRegistration = () => {
  const { addAdmin } = useAdmin();
  const navigate = useNavigate();

  const tipo = "ADMIN";
  const [cpf, setCpf] = useState<string>("");
  const [cargo, setCargo] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [departamento, setDepartamento] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [conferirSenha, setConferirSenha] = useState<string>("");

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
    }

    try {
      setIsLoading(true);

      const admin: AdminType = {
        cpf,
        cargo,
        nome,
        email,
        departamento,
        tipo,
      };

      await addAdmin(admin);

      setIsLoading(false);
      toast("Administrador cadastrado com sucesso!", {
        position: "top-center",
        type: "success",
      });
      navigate("/usuarios");
    } catch (error) {
      setIsLoading(false);
      toast("Ocorreu um erro ao tentar cadastrar o administrador!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    }
  };

  const onClean = (e: ChangeEventType) => {
    e.preventDefault();

    setCpf("");
    setCargo("");
    setNome("");
    setEmail("");
    setDepartamento("");
    setSenha("");
    setConferirSenha("");
    setErrorMessages([]);
  };

  return (
    <div className="flex-column-gap20">
      {isLoading && <Spinner />}

      <h1>Cadastrar administrador</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <Input
            label="CPF"
            type="text"
            required
            autoFocus
            value={cpf}
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
          <Input
            label="Senha"
            type="password"
            required
            value={senha}
            isPassword
            onChange={(e: ChangeEventType) => {
              handleChangeSenha(e.target.value, setErrorMessages, setSenha);
              verificaSenhasIguais(senha, conferirSenha, setErrorMessages);
            }}
          />
          <Input
            label="Confirmar senha"
            type="password"
            required
            value={conferirSenha}
            isPassword
            onChange={(e: ChangeEventType) => {
              handleChangeConfSenha(
                e.target.value,
                setErrorMessages,
                setConferirSenha
              );
              verificaSenhasIguais(senha, e.target.value, setErrorMessages);
            }}
          />
        </div>
        <div className="form-actions flex-column-gap20">
          <Input
            type="reset"
            variant="bgNeutral"
            value="Limpar"
            onClick={onClean}
          />
          <Link to="/usuarios">
            <Button type="cancel" label="Cancelar" />
          </Link>
          <Input type="submit" variant="bgSuccess" value="Cadastrar" />
        </div>
      </form>
    </div>
  );
};

export { AdministratorRegistration };
