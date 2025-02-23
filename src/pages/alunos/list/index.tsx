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
} from "../../../modules/administradores/infrastructure/types";
import { Pagination } from "../../../ui/paginacao";
import { cpfMask } from "../../../modules/alunosAdmFormValidation";

const ListStudents = () => {
  const {
    students,
    getStudent,
    deleteStudent,
    totalPage,
    totalElements,
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
    if (isSearching) {
      searchStudent(
        searchTerm.nome,
        searchTerm.cpf,
        searchTerm.matricula,
        currentPage
      ).finally(() => setIsLoading(false));
    } else {
      getStudent();
    }
  }, [currentPage, searchTerm, isSearching, searchStudent]);

  useEffect(() => {
    if (nome === "" && isSearching) {
      setIsSearching(false);
      getStudent();
      onClean();
    }
  }, [nome]);

  const onClean = () => {
    setMatricula("");
    setCpf("");
    setNome("");
    setSearchTerm({ nome: "", cpf: "", matricula: "" });
    setIsSearching(false);
  };

  const onReset = () => {
    if (!nome && !cpf && !matricula) return;
    getStudent();
    onClean();
    console.log(nome);
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
      setCurrentPage(0);
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

  const onPageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      setIsSearching(true);
      setIsLoading(true);
      searchStudent(
        searchTerm.nome,
        searchTerm.cpf,
        searchTerm.matricula,
        page
      ).finally(() => setIsLoading(false));
    }
  };

  const onNext = () => {
    if (currentPage < totalPage - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setIsSearching(true);
      setIsLoading(true);
      searchStudent(
        searchTerm.nome,
        searchTerm.cpf,
        searchTerm.matricula,
        newPage
      ).finally(() => setIsLoading(false));
    }
  };

  const onPrev = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setIsSearching(true);
      setIsLoading(true);
      searchStudent(
        searchTerm.nome,
        searchTerm.cpf,
        searchTerm.matricula,
        newPage
      ).finally(() => setIsLoading(false));
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

      {totalElements === 0 ? (
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
            {isSearching && statusMessage
              ? `Total de alunos encontrados ao filtrar por "${statusMessage}": `
              : "Total de alunos encontrados: "}
            <span className="permissions-quantity">{totalElements}</span>
          </p>

          <table className="table">
            <thead className="table__header">
              <tr>
                <th>Matricula</th>
                <th>CPF</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Curso</th>
                <th className="table-action action-column">Ações</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student: AlunoType, index: number) => {
                const cpfFormatado = cpfMask(student.cpf || "");
                return (
                  <tr key={index}>
                    <td>{student.matricula}</td>
                    <td>{cpfFormatado}</td>
                    <td>{student.nome}</td>
                    <td>{student.email}</td>
                    <td>{student.curso?.nome} </td>
                    <td className="table-action action-column">
                      <Link to="/alunos/editar-aluno" state={student}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
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
