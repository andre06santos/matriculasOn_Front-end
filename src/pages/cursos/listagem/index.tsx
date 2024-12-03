import { Link, useLocation } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import "./styles.css";
import { useState, useEffect } from "react";
import { Modal } from "../../../ui/modal";

const ListCourses = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "Engenharia Civil" },
    { id: 2, name: "Análise e Desenvolvimento de Sistemas" },
    { id: 3, name: "Arquitetura" },
    { id: 4, name: "Medicina" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const updatedCourse = location.state?.updatedCourse;

  useEffect(() => {
    if (updatedCourse) {
      setCourses((prevCourses) => {
        const updatedCourses = prevCourses.map((course) =>
          course.id === updatedCourse.id
            ? { ...course, name: updatedCourse.name }
            : course
        );
        return updatedCourses;
      });
    }
  }, [updatedCourse]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

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
          <Input placeholder="Nome do curso" />

          <div className="filter-buttons">
            <Input type="submit" value="Buscar" variant="bgInfo" />
            <Input type="reset" value="Limpar" variant="bgNeutral" />
          </div>
        </form>
      </div>

      <p>
        Total de cursos encontrados:{" "}
        <span className="courses-quantity">{courses.length}</span>
      </p>

      <table className="table">
        <thead className="table-header">
          <tr>
            <th>Nome do Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td className="table-actions">
                <Link to="/cursos/editar-curso" state={{ course }}>
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
