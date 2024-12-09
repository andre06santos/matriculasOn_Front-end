import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Modal } from "../../../ui/modal";
import {
  validateEmptyString,
  validWhitespaceBeginning,
} from "../../../modules/formValidationUtils";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import "./styles.css";

const ListCourses = () => {
  const { courses, getCourses, searchCourse, deleteCourse } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nameInput = useRef<any>(null);

  const [name, setName] = useState("");
  const [courseId, setCourseId] = useState("");

  const openModal = (courseId: any) => {
    setIsModalOpen(true);
    setCourseId(courseId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClean = () => setName("");

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

      <div className="filter flex-column-gap20">
        <span>Filtro</span>
        <form className="form-filter" onSubmit={onSubmit}>
          <Input
            placeholder="Nome"
            value={name}
            onChange={(e: any) => {
              handleCourseName(e.target.value);
            }}
            ref={nameInput}
          />

          <div className="filter-buttons">
            <Input type="submit" value="Buscar" variant="bgInfo" />
            <Input
              type="reset"
              value="Limpar"
              variant="bgNeutral"
              onClick={onReset}
            />
          </div>
        </form>
      </div>

      <p>
        Total de cursos encontrados:{""}
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
    </div>
  );
};

export { ListCourses };
