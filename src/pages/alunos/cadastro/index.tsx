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
  verificaSenhasIguais,
} from "../../../modules/alunosAdmFormValidation";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { Spinner } from "../../../ui/spinner";
import { cursoOptions } from "../../../constants";
import { toast } from "react-toastify";
import {
  AlunoType,
  ChangeEventType,
  ErrorMessagesType,
  FormEventType,
  ObjectCursoType,
} from "../../../modules/administradores/infrastructure/types";

const RegisterStudent = () => {
  const [tipo] = useState<string>("ALUNO");
  const [cpf, setCpf] = useState<string>("");
  const [matricula, setMatricula] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [curso, setCurso] = useState<ObjectCursoType | null>(null);
  const [senha, setSenha] = useState<string>("");
  const [conferirSenha, setConferirSenha] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<ErrorMessagesType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { addStudents } = useAdmin();

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
      const cpfNumber = cpf.replace(/\D/g, "");

      const aluno: AlunoType = {
        cpf: cpfNumber,
        nome,
        username,
        matricula,
        email,
        tipo,
        curso: curso!.value,
      };

      await addStudents(aluno);

      setIsLoading(false);
      toast("Aluno cadastrado com sucesso!", {
        position: "top-center",
        type: "success",
      });
      navigate("/alunos");
    } catch (error) {
      setIsLoading(false);
      toast("Ocorreu um erro ao tentar cadastrar o aluno!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    }
  };

  const onClean = (e: ChangeEventType) => {
    e.preventDefault();

    setCpf("");
    setMatricula("");
    setNome("");
    setUsername("");
    setEmail("");
    setCurso(null);
    setSenha("");
    setConferirSenha("");
    setErrorMessages([]);
  };

  return (
    <div className="flex-column-gap20">
      {isLoading && <Spinner />}

      <h1>Cadastrar aluno</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <Input
            label="CPF"
            type="text"
            value={cpf}
            required
            autoFocus
            onChange={(e: ChangeEventType) =>
              handleChangeCpf(e.target.value, setErrorMessages, setCpf)
            }
          />
          <Input
            label="Matrícula"
            type="text"
            required
            value={matricula}
            onChange={(e: ChangeEventType) =>
              handleChangeMatricula(e.target.value, setMatricula)
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
            value={email}
            required
            onChange={(e: ChangeEventType) =>
              handleChangeEmail(e.target.value, setErrorMessages, setEmail)
            }
          />
          <Input
            label="Curso"
            selectOptions={cursoOptions}
            required
            value={curso}
            onChange={setCurso}
          />
          <Input
            label="Senha"
            type="password"
            required
            value={senha}
            isPassword
            onChange={(e: ChangeEventType) => {
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
            isPassword
            onChange={(e: ChangeEventType) => {
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

export { RegisterStudent };
