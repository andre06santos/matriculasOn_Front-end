import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  handleChangeCargo,
  handleChangeConfSenha,
  handleChangeCpf,
  handleChangeDepartamento,
  handleChangeEmail,
  handleChangeNome,
  handleChangeSenha,
  handleChangeUsername,
  verificaSenhasIguais,
} from "../../../modules/alunosAdmFormValidation";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { Spinner } from "../../../ui/spinner";

const AdministratorRegistration = () => {
  const { addAdmin } = useAdmin();
  const [cpf, setCpf] = useState("");
  const [cargo, setCargo] = useState("");
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [senha, setSenha] = useState("");
  const [conferirSenha, setConferirSenha] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (errorMessages.length > 0) {
      const firstError = Object.values(errorMessages[0])[0];
      console.log(firstError);
    }

    try {
      setIsLoading(true);

      const admin = {
        cpf,
        cargo,
        nome,
        username,
        email,
        departamento,
      };

      await addAdmin(admin);

      console.log("Administrador cadastrado com sucesso!");
      setIsLoading(false);
      navigate("/usuarios");
    } catch (error) {
      setIsLoading(false);
      console.log("Ocorreu um erro ao tentar cadastrar o administrador!");
      console.error((error as Error).message);
    }
  };

  const onClean = (e: any) => {
    e.preventDefault();

    setCpf("");
    setCargo("");
    setNome("");
    setUsername("");
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
            value={cpf}
            onChange={(e: any) =>
              handleChangeCpf(e.target.value, setErrorMessages, setCpf)
            }
          />
          <Input
            label="Cargo"
            type="text"
            required
            value={cargo}
            onChange={(e: any) => handleChangeCargo(e.target.value, setCargo)}
          />
          <Input
            label="Nome"
            type="text"
            required
            value={nome}
            onChange={(e: any) => handleChangeNome(e.target.value, setNome)}
          />
        </div>
        <div className="input-group">
          <Input
            label="Username"
            type="text"
            required
            value={username}
            onChange={(e: any) =>
              handleChangeUsername(e.target.value, setUsername)
            }
          />
          <Input
            label="Email"
            type="text"
            required
            value={email}
            onChange={(e: any) =>
              handleChangeEmail(e.target.value, setErrorMessages, setEmail)
            }
          />
          <Input
            label="Departamento"
            type="text"
            required
            value={departamento}
            onChange={(e: any) =>
              handleChangeDepartamento(e.target.value, setDepartamento)
            }
          />
        </div>
        <div className="input-group ">
          <Input
            label="Senha"
            type="password"
            required
            value={senha}
            onChange={(e: any) => {
              handleChangeSenha(e.target.value, setErrorMessages, setSenha);
              verificaSenhasIguais(
                e.target.event,
                conferirSenha,
                setErrorMessages
              );
            }}
          />
          <Input
            label="Confirmar senha"
            type="password"
            required
            value={conferirSenha}
            onChange={(e: any) => {
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
