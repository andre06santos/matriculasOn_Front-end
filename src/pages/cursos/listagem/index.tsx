import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Modal } from "../../../ui/modal";
import { validateEmptyString } from "../../../modules/formValidationUtils";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { NotFound } from "../../../ui/not-found";
import { CoursesFilter } from "./filter";
import "./styles.css";
import { Spinner } from "../../../ui/spinner";

const ListCourses = () => {
  const { courses, getCourses, searchCourse, deleteCourse } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const checkFields = () => {
    if (name === "") {
      getCourses();
      onClean();
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deleteCourse(courseId);

      console.log("Curso excluído com sucesso!");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
      console.log("Digite um nome para filtrar!");
      onClean();
      onFocus();

      return;
    }

    try {
      setIsLoading(true);
      await searchCourse(name);
      setIsSearching(true);
      setSearchTerm(name);
    } catch (error) {
      console.log("Ocorreu um erro ao tentar filtrar curso!");
      console.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkFields();
  }, [name]);

  return (
    <div className="flex-column-gap20">
      {isLoading && <Spinner />}

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
            <CoursesFilter
              onSubmit={onSubmit}
              name={name}
              setName={setName}
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
          <CoursesFilter
            onSubmit={onSubmit}
            name={name}
            setName={setName}
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
