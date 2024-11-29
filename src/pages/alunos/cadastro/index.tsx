import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  handleChangeConfSenha,
  handleChangeCpf,
  handleChangeEmail,
  handleChangeMatricula,
  handleChangeNome,
  handleChangeSenha,
  handleChangeUsername,
  verificaSenhasIguais,
} from "../../../modules/alunosAdmFormValidation";

const RegisterStudent = () => {
  const [cpf, setCpf] = useState("");
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const cursoOptions = [
    { text: "Análise e Desenvolvimento de Sistemas", value: "ADS" },
    { text: "Engenharia de Software", value: "ENG_SOF" },
    { text: "Redes de Computadores", value: "RED" },
    { text: "Tecnologia da Informação", value: "TEC_INF" },
  ];

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

  return (
    <div className="flex-column-gap20">
      <h1>Cadastrar aluno</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <Input
            label="CPF"
            type="text"
            value={cpf}
            required
            onChange={(e: any) =>
              handleChangeCpf(e.target.value, setErrorMessages, setCpf)
            }
          />
          <Input
            label="Matrícula"
            type="text"
            required
            value={matricula}
            onChange={(e: any) =>
              handleChangeMatricula(
                e.target.value,
                setErrorMessages,
                setMatricula
              )
            }
          />
          <Input
            label="Nome"
            type="text"
            required
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
            required
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
            required
            onChange={(e: any) =>
              handleChangeEmail(e.target.value, setErrorMessages, setEmail)
            }
          />
          <Input
            label="Curso"
            selectOptions={cursoOptions}
            required
            text={curso}
            onChange={(e: any) => setCurso(e.text)}
          />
        </div>
        <div className="input-group">
          <Input
            label="Senha"
            type="password"
            required
            value={senha}
            onChange={(e: any) => {
              handleChangeSenha(e.target.value, setErrorMessages, setSenha);
              verificaSenhasIguais(e.target.value, confSenha, setErrorMessages);
            }}
          />
          <Input
            label="Confirmar senha"
            type="password"
            required
            value={confSenha}
            onChange={(e: any) => {
              handleChangeConfSenha(
                e.target.value,
                setErrorMessages,
                setConfSenha
              );
              verificaSenhasIguais(e.target.value, senha, setErrorMessages);
            }}
          />
        </div>
        <div className="form-actions flex-column-gap20">
          <Input type="reset" variant="bgNeutral" value="Limpar" />
          <Link to="/usuarios">
            <Button type="cancel" label="Cancelar" />
          </Link>
          <Input type="submit" variant="bgSuccess" value="Cadastrar" />
        </div>
      </form>
    </div>
  );
};

export { RegisterStudent };
