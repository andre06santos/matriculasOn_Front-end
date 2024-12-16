import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import "./styles.css";
import { useEffect, useState } from "react";
import { Modal } from "../../../ui/modal";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";

const ListStudents = () => {
  const { students, getStudent, deleteStudent } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [studentId, setStudentId] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (studentId: any) => {
    setIsModalOpen(true);
    setStudentId(studentId);
  };

  const onDelete = async () => {
    try {
      await deleteStudent(studentId);

      console.log("Aluno excluído com sucesso!");
    } catch (error) {
      console.log("Ocorreu um erro ao tentar excluir o aluno!");
      console.error((error as Error).message);
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <div className="flex-column-gap20">
      {isModalOpen && (
        <Modal
          message="Tem certeza que deseja excluir o cadastro deste aluno?"
          onCancel={closeModal}
          onDelete={onDelete}
        />
      )}
      <h1>Alunos</h1>

      <div className="filter flex-column-gap20">
        <span>Filtros</span>
        <form action="" className="form-filter">
          <Input placeholder="Matrícula" />
          <Input placeholder="CPF" />
          <Input placeholder="Nome" />

          <div className="filter__buttons">
            <Input type="submit" variant="bgInfo" value="Buscar" />
            <Input type="reset" variant="bgNeutral" value="Limpar" />
          </div>
        </form>
      </div>

      <p>
        Total de alunos encontradas:{" "}
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
    </div>
  );
};

export { ListStudents };
