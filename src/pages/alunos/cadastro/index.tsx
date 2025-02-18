import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import {
  AlunoType,
  ChangeEventType,
  CursoOption,
  ErrorMessagesType,
  FormEventType,
  ObjectCursoType,
} from "../../../modules/administradores/infrastructure/types";

const RegisterStudent = () => {
  const tipo = "ALUNO";
  const [cpf, setCpf] = useState<string>("");
  const [matricula, setMatricula] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [cursoOptions, setCursoOptions] = useState<CursoOption[]>([]);
  const [email, setEmail] = useState<string>("");
  const [curso, setCurso] = useState<ObjectCursoType | null>(null);
  const [senha, setSenha] = useState<string>("");
  const [conferirSenha, setConferirSenha] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<ErrorMessagesType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCourses, setIsLoadingCourses] = useState<boolean>(true);
  const [coursesLoaded, setCoursesLoaded] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [isLoadingMoreCourses, setIsLoadingMoreCourses] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const { addStudents, courses, getCourses } = useAdmin();

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
      const aluno: AlunoType = {
        senha,
        pessoa: {
          tipo,
          cpf,
          nome,
          matricula,
          email,
          curso: {
            id: curso?.value,
          },
        },
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
    setEmail("");
    setCurso(null);
    setSenha("");
    setConferirSenha("");
    setErrorMessages([]);
  };

  const loadCourses = async (pageNumber: number) => {
    setIsLoadingMoreCourses(true);

    try {
      await getCourses(pageNumber);
      setPage(pageNumber);
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
    } finally {
      setIsLoadingMoreCourses(false);
    }
  };

  useEffect(() => {
    const loadInitialCourses = async () => {
      try {
        if (!coursesLoaded) {
          await getCourses(0);
          setCoursesLoaded(true);
        }
        const updatedOptions = courses.map((course) => ({
          label: course.nome,
          value: course.id,
        }));
        setCursoOptions(updatedOptions);
        setIsLoadingCourses(false);
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
        setIsLoadingCourses(false);
      }
    };

    loadInitialCourses();
  }, [courses, getCourses, coursesLoaded]);

  useEffect(() => {
    if (courses.length > 0) {
      const updatedOptions = courses.map((course) => ({
        label: course.nome,
        value: course.id,
      }));
      setCursoOptions((updatedOptions));
    }
  }, [courses]);

  return (
    <div className="flex-column-gap20">
      {isLoading || isLoadingCourses ? (
        <Spinner />
      ) : (
        <>
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
              <div className="button-container">
                <Button
                  label={
                    courses.length
                      ? "Carregar mais cursos"
                      : "Todos os cursos foram carregados!"
                  }
                  onClick={() => loadCourses(page + 1)}
                  type="load"
                />
              </div>
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
        </>
      )}
    </div>
  );
};

export { RegisterStudent };
