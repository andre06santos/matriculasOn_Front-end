import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
const EditStudent = () => {
  const { state: student } = useLocation();
  const [cpf, setCpf] = useState(student.cpf);
  const [matricula, setMatricula] = useState(student.matricula);
  const [nome, setNome] = useState(student.nome);
  const [username, setUsername] = useState(student.username);
  const [email, setEmail] = useState(student.email);
  const [curso, setCurso] = useState(student.curso);
  const [senha, setSenha] = useState("");
  const [conferirSenha, setConferirSenha] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const cursoOptions = [
    { text: "Análise e Desenvolvimento de Sistemas", value: "ADS" },
    { text: "Engenharia de Software", value: "ENG_SOF" },
    { text: "Redes de Computadores", value: "RED_COMP" },
    { text: "Tecnologia da Informação", value: "TEC_INFO" },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const listaErros = Object.values(errorMessages).filter(
      (error) => error !== ""
    );

    if (listaErros.length > 0) {
      console.log(listaErros[0]);
    } else {
      navigate("/usuarios");
    }
  };

  const onClean = (e: any) => {
    e.preventDefault();

    setCpf("");
    setMatricula("");
    setNome("");
    setUsername("");
    setEmail("");
    setCurso("");
    setSenha("");
    setConferirSenha("");
    setErrorMessages({});
  };

  return (
    <div className="flex-column-gap20">
      <h1>Editar aluno</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <Input
            label="CPF"
            type="text"
            value={cpf}
            readOnly
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
            text={curso}
            onChange={(e: any) => setCurso(e.value)}
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
              verificaSenhasIguais(
                e.target.value,
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
              verificaSenhasIguais(e.target.value, senha, setErrorMessages);
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

export { EditStudent };
