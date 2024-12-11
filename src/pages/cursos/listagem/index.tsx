import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Modal } from "../../../ui/modal";
import {
  validateEmptyString,
  validWhitespaceBeginning,
} from "../../../modules/formValidationUtils";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { NotFound } from "../../../ui/not-found";
import { Filter } from "./filter";
import "./styles.css";

const ListCourses = () => {
  const { courses, getCourses, searchCourse, deleteCourse } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nameInput = useRef<any>(null);

  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [courseId, setCourseId] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const openModal = (courseId: any) => {
    setIsModalOpen(true);
    setCourseId(courseId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClean = () => {
    setName("");
    setSearchTerm("");
    setIsSearching(false);
  };

  const onFocus = () => nameInput.current.focus();

  const onReset = () => {
    if (name === "") return;

    onClean();
    onFocus();
    getCourses();
  };

  const handleCourseName = (name: any) => {
    const hasWhitespace = validWhitespaceBeginning(name);

    if (hasWhitespace) return;

    setName(name);

    const emptyField = validateEmptyString(name);

    if (emptyField) {
      onReset();
    }
  };

  const onDelete = async () => {
    try {
      await deleteCourse(courseId);

      console.log("Curso excluído com sucesso!");
    } catch (error) {
      console.log("Ocorreu um erro ao tentar excluir o curso!");
      console.error((error as Error).message);
    } finally {
      closeModal();
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const emptyField = validateEmptyString(name);

    if (emptyField) {
      console.log("Digite um nome para filtar!");
      onClean();
      onFocus();

      return;
    }

    try {
      await searchCourse(name);
      setIsSearching(true);
      setSearchTerm(name);
    } catch (error) {
      console.log("Ocorreu um erro ao tentar filtar curso!");
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="flex-column-gap20">
      {isModalOpen && (
        <Modal
          message="Tem certeza que deseja excluir este curso?"
          onCancel={closeModal}
          onDelete={onDelete}
        />
      )}

      <div className="add-button">
        <Link to="/cursos/novo-curso">
          <Button type="success" label="Adicionar" />
        </Link>
      </div>

      <h1>Cursos</h1>

      {courses.length === 0 ? (
        isSearching ? (
          <>
            <Filter
              onSubmit={onSubmit}
              name={name}
              handleCourseName={handleCourseName}
              nameInput={nameInput}
              onReset={onReset}
            />
            <NotFound
              message={`A busca por "${searchTerm}" não retornou nenhum curso!`}
            />
          </>
        ) : (
          <NotFound message="Nenhum curso foi encontrado!" />
        )
      ) : (
        <>
          <Filter
            onSubmit={onSubmit}
            name={name}
            handleCourseName={handleCourseName}
            nameInput={nameInput}
            onReset={onReset}
          />

          <p>
            {isSearching
              ? `Total de cursos encontrados ao filtrar por "${searchTerm}": `
              : "Total de cursos encontrados: "}
            <span className="courses-quantity">{courses.length}</span>
          </p>

          <table className="table">
            <thead className="table-header">
              <tr>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course: any, index: any) => (
                <tr key={index}>
                  <td>{course.nome}</td>
                  <td className="table-actions">
                    <Link to="/cursos/editar-curso" state={course}>
                      <i className="fa-solid fa-pen-to-square icons-action"></i>
                    </Link>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => openModal(course.id)}
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

export { ListCourses };
