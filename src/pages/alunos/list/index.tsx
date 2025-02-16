import { Link } from "react-router-dom";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../../../ui/modal";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { NotFound } from "../../../ui/not-found";
import { Filter } from "./filter";
import { validateEmptyString } from "../../../modules/formValidationUtils";
import { Spinner } from "../../../ui/spinner";
import { toast } from "react-toastify";
import {
  AlunosSearchTermType,
  AlunoType,
  FormEventType,
  UserType,
} from "../../../modules/administradores/infrastructure/types";
import { Pagination } from "../../../ui/paginacao";

const ListStudents = () => {
  const {
    users,
    getUsers,
    students,
    getStudent,
    deleteStudent,
    totalPage,
    searchStudent,
  } = useAdmin();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [matricula, setMatricula] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<AlunosSearchTermType>({
    nome: "",
    cpf: "",
    matricula: "",
  });
  const [studentId, setStudentId] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);

  const nameInput = useRef<HTMLInputElement | null>(null);
  const cpfInput = useRef<HTMLInputElement | null>(null);
  const matriculaInput = useRef<HTMLInputElement | null>(null);

  const statusMessage =
    searchTerm.nome || searchTerm.matricula || searchTerm.cpf;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (studentId: string) => {
    setIsModalOpen(true);
    setStudentId(studentId);
  };

  const checkFields = () => {
    if (nome === "" && matricula === "" && cpf === "") {
      getStudent(0);
      getUsers(0);
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
    getStudent(0);
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
      await searchStudent(nome, totalPage, cpf, matricula);
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

  const mapUserToAluno = (user: UserType): AlunoType => {
    return {
      id: user.id,
      pessoa: {
        id: user.pessoa.id,
        tipo: user.pessoa.tipo,
        cpf: user.pessoa.cpf,
        matricula: user.pessoa.matricula || null,
        nome: user.pessoa.nome,
        email: user.pessoa.email,
        curso: user.pessoa.curso || null,
      },
    };
  };

  const studentsOnly = users
    .filter((user: UserType) => user.pessoa.tipo === "ALUNO")
    .map(mapUserToAluno);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
    if (isSearching) {
      searchStudent(
        searchTerm.nome,
        page,
        searchTerm.cpf,
        searchTerm.matricula
      ).finally(() => setIsLoading(false));
    } else {
      getStudent(page).finally(() => setIsLoading(false));
    }
  };

  const onNext = () => {
    if (currentPage < totalPage - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setIsLoading(true);
      if (isSearching) {
        searchStudent(
          searchTerm.nome,
          newPage,
          searchTerm.cpf,
          searchTerm.matricula
        ).finally(() => setIsLoading(false));
      } else {
        getStudent(newPage).finally(() => setIsLoading(false));
      }
    }
  };

  const onPrev = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setIsLoading(true);
      if (isSearching) {
        searchStudent(
          searchTerm.nome,
          newPage,
          searchTerm.cpf,
          searchTerm.matricula
        ).finally(() => setIsLoading(false));
      } else {
        getStudent(newPage).finally(() => setIsLoading(false));
      }
    }
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
            <span className="permissions-quantity">{studentsOnly.length}</span>
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
              {studentsOnly.map((student: AlunoType, index: number) => (
                <tr key={index}>
                  <td>{student?.pessoa?.matricula}</td>
                  <td>{student?.pessoa?.cpf}</td>
                  <td>{student?.pessoa?.nome}</td>
                  <td>{student?.pessoa?.email}</td>
                  <td>{student?.pessoa?.curso?.nome} </td>
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

          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={onPageChange}
            onNext={onNext}
            onPrev={onPrev}
          />
        </>
      )}
    </div>
  );
};

export { ListStudents };
