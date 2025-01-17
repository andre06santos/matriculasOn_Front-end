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
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { Spinner } from "../../../ui/spinner";
const EditStudent = () => {
  const { state: student } = useLocation();
  const { editStudent } = useAdmin();
  const [cpf, setCpf] = useState(student.cpf);
  const [matricula, setMatricula] = useState(student.matricula);
  const [nome, setNome] = useState(student.nome);
  const [username, setUsername] = useState(student.username);
  const [email, setEmail] = useState(student.email);
  const [curso, setCurso] = useState(student.curso);
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
      return;
    }

    try {
      setIsLoading(true);

      const newStudent = {
        cpf,
        nome,
        username,
        matricula,
        email,
        curso,
      };

      await editStudent({ id: student.id, newStudent });
      setIsLoading(false);
      console.log("Aluno editado com sucesso!");

      navigate("/alunos");
    } catch (error) {
      setIsLoading(false);

      console.log("Ocorreu um erro ao tentar editar o aluno!");
      console.error((error as Error).message);
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
    setErrorMessages([]);
  };

  return (
    <div className="flex-column-gap20">
      {isLoading && <Spinner />}

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
              handleChangeMatricula(e.target.value, setMatricula)
            }
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
            value={username}
            required
            onChange={(e: any) =>
              handleChangeUsername(e.target.value, setUsername)
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
            value={curso}
            onChange={setCurso}
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
          <Input type="submit" variant="bgSuccess" value="Salvar" />
        </div>
      </form>
    </div>
  );
};

export { EditStudent };

const cursoOptions = [
  { label: "Análise e Desenvolvimento de Sistemas", value: "ADS" },
  { label: "Engenharia de Software", value: "ENG_SOF" },
  { label: "Redes de Computadores", value: "RED_COMP" },
  { label: "Tecnologia da Informação", value: "TEC_INFO" },
];
