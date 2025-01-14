import { Link } from "react-router-dom";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../../../ui/modal";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { NotFound } from "../../../ui/not-found";
import { Filter } from "./filter";
import { validateEmptyString } from "../../../modules/formValidationUtils";
import { Spinner } from "../../../ui/spinner";
import { cursoOptions } from "../../../constants";
import { cpfMask } from "../../../modules/alunosAdmFormValidation";
import { toast } from "react-toastify";
import {
  alunosSearchTermType,
  alunoType,
  FormEventType,
  objectCursoType,
} from "../../../modules/administradores/infrastructure/types";

const ListStudents = () => {
  const { students, getStudent, deleteStudent, searchStudent } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [matricula, setMatricula] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<alunosSearchTermType>({
    nome: "",
    cpf: "",
    matricula: "",
  });
  const [studentId, setStudentId] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const nameInput = useRef<HTMLInputElement | null>(null);
  const cpfInput = useRef<HTMLInputElement | null>(null);
  const matriculaInput = useRef<HTMLInputElement | null>(null);

  let statusMessage;

  if (searchTerm.nome) {
    statusMessage = searchTerm.nome;
  } else if (searchTerm.matricula) {
    statusMessage = searchTerm.matricula;
  } else if (searchTerm.cpf) {
    statusMessage = searchTerm.cpf;
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (studentId: string) => {
    setIsModalOpen(true);
    setStudentId(studentId);
  };

  const checkFields = () => {
    if (nome === "" && matricula === "" && cpf === "") {
      getStudent();
      onClean();
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deleteStudent(studentId);
      setIsLoading(false);
      toast("Aluno excluído com sucesso!", {
        position: "top-center",
        type: "success",
      });
    } catch (error) {
      setIsLoading(false);
      toast("Ocorreu um erro ao tentar excluir o cadastro do aluno!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    } finally {
      closeModal();
    }
  };
  useEffect(() => {
    checkFields();
  }, [nome, matricula, cpf]);

  const onClean = () => {
    setMatricula("");
    setCpf("");
    setNome("");
    setIsSearching(false);
  };

  const onReset = () => {
    onClean();
    getStudent();
  };

  const onSubmit = async (e: FormEventType) => {
    e.preventDefault();

    const emptyFieldName = validateEmptyString(nome);
    const emptyFieldMatricula = validateEmptyString(matricula);
    const emptyFieldCPF = validateEmptyString(cpf);

    if (emptyFieldName && emptyFieldMatricula && emptyFieldCPF) {
      toast("Preencha um dos campos para filtrar!", {
        position: "top-center",
        type: "error",
      });
      onClean();

      return;
    }
    try {
      setIsLoading(true);
      await searchStudent(nome, cpf, matricula);
      setIsSearching(true);
      setSearchTerm({ nome, cpf, matricula });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast("Ocorreu um erro ao tentar filtrar alunos!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    }
  };

  const findCourseLabel = (value: string): string | undefined => {
    const course = cursoOptions.find((option) => option.value === value);
    const courseLabel = course?.label;

    return courseLabel;
  };

  return (
    <div className="flex-column-gap20">
      {isLoading && <Spinner />}
      {isModalOpen && (
        <Modal
          message="Tem certeza que deseja excluir o cadastro deste aluno?"
          onCancel={closeModal}
          onDelete={onDelete}
        />
      )}
      <h1>Alunos</h1>

      {students.length === 0 ? (
        isSearching ? (
          <>
            <Filter
              onSubmit={onSubmit}
              name={nome}
              setName={setNome}
              nameInput={nameInput}
              cpf={cpf}
              setCpf={setCpf}
              cpfInput={cpfInput}
              matricula={matricula}
              setMatricula={setMatricula}
              matriculaInput={matriculaInput}
              onReset={onReset}
            />
            <NotFound
              message={`A busca por "${statusMessage}" não retornou nenhum aluno!`}
            />
          </>
        ) : (
          <NotFound message="Nenhum Aluno foi encontrado!" />
        )
      ) : (
        <>
          <Filter
            onSubmit={onSubmit}
            name={nome}
            setName={setNome}
            nameInput={nameInput}
            cpf={cpf}
            setCpf={setCpf}
            cpfInput={cpfInput}
            matricula={matricula}
            setMatricula={setMatricula}
            matriculaInput={matriculaInput}
            onReset={onReset}
          />

          <p>
            {isSearching
              ? `Total de alunos encontrados ao filtrar por "${statusMessage}": `
              : "Total de alunos encontrados: "}
            <span className="permissions-quantity">{students.length}</span>
          </p>

          <table className="table">
            <thead className="table__header">
              <tr>
                <th>Matricula</th>
                <th>CPF</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Curso</th>
                <th className="table-actions action-column">Ações</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student: alunoType, index: string) => (
                <tr key={index}>
                  <td>{student.matricula}</td>
                  <td>{cpfMask(student.cpf)}</td>
                  <td>{student.nome}</td>
                  <td>{student.email}</td>
                  <td>{findCourseLabel(student.curso)}</td>
                  <td className="table-actions action-column">
                    <Link to="/alunos/editar-aluno" state={student}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => openModal(student.id!)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export { ListStudents };
