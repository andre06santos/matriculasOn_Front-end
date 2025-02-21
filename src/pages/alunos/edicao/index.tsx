import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  handleChangeCpf,
  handleChangeEmail,
  handleChangeMatricula,
  handleChangeNome,
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
} from "../../../modules/administradores/infrastructure/types";

const EditStudent = () => {
  const { state: student } = useLocation();


  const { editStudent, courses, getCourses } = useAdmin();
  const [cursoOptions, setCursoOptions] = useState<CursoOption[]>([]);
  const [page, setPage] = useState<number>(0);
  const [coursesLoaded, setCoursesLoaded] = useState<boolean>(false);
  const [cpf, setCpf] = useState<string>(student.cpf);
  const [matricula, setMatricula] = useState<string>(student.matricula);
  const [nome, setNome] = useState<string>(student.nome);
  const [email, setEmail] = useState<string>(student.email);
  const [curso, setCurso] = useState<CursoOption | undefined>(
    student.curso
      ? { label: student.curso.nome, value: student.curso.id }
      : undefined
  );

  const [errorMessages, setErrorMessages] = useState<ErrorMessagesType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCourses, setIsLoadingCourses] = useState<boolean>(true);
  const navigate = useNavigate();

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
      const newStudent: AlunoType = {
        cpf,
        nome,
        matricula,
        email,
        curso: {
          id: curso?.value ? Number(curso.value) : undefined,
        }
      };

      await editStudent({ newStudent });
      setIsLoading(false);
      toast("Aluno editado com sucesso!", {
        position: "top-center",
        type: "success",
      });

      navigate("/alunos");
    } catch (error) {
      setIsLoading(false);
      toast("Ocorreu um erro ao tentar editar o aluno!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    }
  };

  const loadMoreCourses = async () => {

    try {
      await getCourses();
      setPage(page + 1);
    } catch (error) {
      console.error("Erro ao carregar mais cursos:", error);
    }
  };

  useEffect(() => {
    const loadCourses = async () => {
      try {
        if (!coursesLoaded) {
          await getCourses();
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

    loadCourses();
  }, [courses, getCourses, coursesLoaded]);

  return (
    <div className="flex-column-gap20">
      {isLoading || isLoadingCourses ? (
        <Spinner />
      ) : (
        <>
          <h1>Editar aluno</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <Input
                label="CPF"
                type="text"
                value={cpf}
                readOnly
                required
                style={{ opacity: 0.3 }}
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
                value={curso}
                onChange={setCurso}
                required
              />
              <div className="button-container">
                <Button
                  label={
                    courses.length
                      ? "Carregar mais cursos"
                      : "Todos os cursos foram carregados!"
                  }
                  onClick={loadMoreCourses}
                  type="load"
                />
              </div>
            </div>
            <div className="form-actions flex-column-gap20">
              <Link to="/usuarios">
                <Button type="cancel" label="Cancelar" />
              </Link>
              <Input type="submit" variant="bgSuccess" value="Salvar" />
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export { EditStudent };
