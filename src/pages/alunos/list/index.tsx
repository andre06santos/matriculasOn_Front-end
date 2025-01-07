import { Link } from "react-router-dom";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../../../ui/modal";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { NotFound } from "../../../ui/not-found";
import { Filter } from "./filter";
import { validateEmptyString } from "../../../modules/formValidationUtils";
import { Spinner } from "../../../ui/spinner";

const ListStudents = () => {
  const { students, getStudent, deleteStudent, searchStudent } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [matricula, setMatricula] = useState("");
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [searchTerm, setSearchTerm] = useState({
    nome: "",
    cpf: "",
    matricula: "",
  });
  const [studentId, setStudentId] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const nameInput = useRef<any>(null);
  const cpfInput = useRef<any>(null);
  const matriculaInput = useRef<any>(null);

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

  const openModal = (studentId: any) => {
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
      console.log("Aluno excluído com sucesso!");
    } catch (error) {
      setIsLoading(false);
      console.log("Ocorreu um erro ao tentar excluir o aluno!");
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

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const emptyFieldName = validateEmptyString(nome);
    const emptyFieldMatricula = validateEmptyString(matricula);
    const emptyFieldCPF = validateEmptyString(cpf);

    if (emptyFieldName && emptyFieldMatricula && emptyFieldCPF) {
      console.log("Preencha um dos campos para filtrar!");
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
      console.log("Ocorreu um erro ao tentar filtrar aluno!");
      console.error((error as Error).message);
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
              {students.map((student: any, index: any) => (
                <tr key={index}>
                  <td>{student.matricula}</td>
                  <td>{student.cpf}</td>
                  <td>{student.nome}</td>
                  <td>{student.email}</td>
                  <td>{student.curso}</td>
                  <td className="table-actions action-column">
                    <Link to="/alunos/editar-aluno" state={student}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => openModal(student.id)}
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
