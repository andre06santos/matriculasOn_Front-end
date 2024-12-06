import { Link, useLocation } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import "./styles.css";
import { useState } from "react";
import { Modal } from "../../../ui/modal";

const ListCourses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const courses = [
    {
      name: "Engenharia Civil",
    },
    {
      name: "Análise e Desenvolvimento de Sistemas",
    },
    {
      name: "Arquitetura",
    },
  ];

  return (
    <div className="flex-column-gap20">
      {isModalOpen && (
        <Modal
          message="Tem certeza que deseja excluir este curso?"
          onCancel={closeModal}
        />
      )}
      <div className="add-button">
        <Link to="/cursos/novo-curso">
          <Button type="success" label="Adicionar" />
        </Link>
      </div>
      <h1>Cursos</h1>
      <div className="filter flex-column-gap20">
        <span>Filtros</span>
        <form action="" className="form-filter">
          <Input placeholder="Nome" />

          <div className="filter-buttons">
            <Input type="submit" value="Buscar" variant="bgInfo" />
            <Input type="reset" value="Limpar" variant="bgNeutral" />
          </div>
        </form>
      </div>
      <p>
        Total de cursos encontrados:{""}
        <span className="courses-quantity">3</span>
      </p>

      <table className="table">
        <thead className="table-header">
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index): any => (
            <tr key={index}>
              <td>{course.name}</td>
              <td className="table-actions">
                <Link to="/cursos/editar-curso" state={course}>
                  <i className="fa-solid fa-pen-to-square icons-action"></i>
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

export { ListCourses };
