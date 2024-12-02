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

const EditAdmin = () => {
  const [cpf, setCpf] = useState("");
  const [cargo, setCargo] = useState("");
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [senha, setSenha] = useState("");
  const [conferirSenha, setConferirSenha] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const listaErros = Object.values(errorMessages).filter(
      (error) => error !== ""
    );

    if (listaErros.length > 0) {
      console.log(listaErros[0]);

      return;
    } else {
      navigate("/usuarios");
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
    setErrorMessages({});
  };

  return (
    <div className="flex-column-gap20">
      <h1>Editar administrador</h1>
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
            value={cargo}
            onChange={(e: any) =>
              handleChangeCargo(e.target.value, setErrorMessages, setCargo)
            }
          />
          <Input
            label="Nome"
            type="text"
            value={nome}
            onChange={(e: any) =>
              handleChangeNome(e.target.value, setErrorMessages, setNome)
            }
          />
        </div>
        <div className="input-group">
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e: any) =>
              handleChangeUsername(
                e.target.value,
                setErrorMessages,
                setUsername
              )
            }
          />
          <Input
            label="Email"
            type="text"
            value={email}
            onChange={(e: any) =>
              handleChangeEmail(e.target.value, setErrorMessages, setEmail)
            }
          />
          <Input
            label="Departamento"
            type="text"
            value={departamento}
            onChange={(e: any) =>
              handleChangeDepartamento(
                e.target.value,
                setErrorMessages,
                setDepartamento
              )
            }
          />
        </div>
        <div className="input-group ">
          <Input
            label="Senha"
            type="password"
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

export { EditAdmin };
