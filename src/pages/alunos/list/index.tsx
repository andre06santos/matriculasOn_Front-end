import { Link } from "react-router-dom";
import { Input } from "../../../ui/input";
import "./styles.css";
import { useRef, useState } from "react";
import { Modal } from "../../../ui/modal";
import {
  handleChangeFilterCpf,
  handleChangeFilterMatricula,
  handleChangeFilterNome,
} from "../../../modules/alunosAdmFormValidation";

const ListStudents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [matricula, setMatricula] = useState("");
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const matriculaInput = useRef<any>(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const onClean = () => {
    setMatricula("");
    setCpf("");
    setNome("");
  };

  const onFocus = () => matriculaInput.current.focus();

  const onReset = () => {
    onClean();
    onFocus();
  };

  return (
    <div className="flex-column-gap20">
      {isModalOpen && (
        <Modal
          message="Tem certeza que deseja excluir o cadastro deste aluno?"
          onCancel={closeModal}
        />
      )}
      <h1>Alunos</h1>

      <div className="filter flex-column-gap20">
        <span>Filtros</span>
        <form action="" className="form-filter">
          <Input
            placeholder="Matrícula"
            value={matricula}
            onChange={(e: any) =>
              handleChangeFilterMatricula(e.target.value, setMatricula)
            }
            ref={matriculaInput}
          />
          <Input
            placeholder="CPF"
            value={cpf}
            onChange={(e: any) => handleChangeFilterCpf(e.target.value, setCpf)}
          />
          <Input
            placeholder="Nome"
            value={nome}
            onChange={(e: any) =>
              handleChangeFilterNome(e.target.value, setNome)
            }
          />

          <div className="filter__buttons">
            <Input type="submit" variant="bgInfo" value="Buscar" />
            <Input
              type="reset"
              variant="bgNeutral"
              value="Limpar"
              onClick={onReset}
            />
          </div>
        </form>
      </div>

      <p>
        Total de alunos encontradas:{" "}
        <span className="permissions-quantity">3</span>
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
          {students.map((student, index): any => (
            <tr key={index}>
              <td>{student.matricula}</td>
              <td>{student.cpf}</td>
              <td>{student.nome}</td>
              <td>{student.email}</td>
              <td>{student.curso}</td>
              <td className="table-actions action-column">
                <Link to="/alunos/editar-aluno">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <i className="fa-solid fa-trash-can" onClick={openModal}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { ListStudents };

const students = [
  {
    matricula: "2568574MJGHF",
    cpf: "123.456.789-00",
    nome: "Maria da Silva Costa",
    email: "maria.silva@live.com",
    curso: "Engenharia Civil",
  },
  {
    matricula: "2568574MJGHF",
    cpf: "123.456.789-00",
    nome: "Maria da Silva Costa",
    email: "maria.silva@live.com",
    curso: "Engenharia Civil",
  },
  {
    matricula: "2568574MJGHF",
    cpf: "123.456.789-00",
    nome: "Maria da Silva Costa",
    email: "maria.silva@live.com",
    curso: "Engenharia Civil",
  },
];
