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
import { toast } from "react-toastify";
import {
  CursoType,
  FormEventType,
} from "../../../modules/administradores/infrastructure/types";
import { Pagination } from "../../../ui/paginacao";

const ListCourses = () => {
  const {
    courses,
    getCourses,
    searchCourse,
    deleteCourse,
    totalCourses,
    totalPage,
  } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [courseId, setCourseId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const nameInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setIsLoading(true);
    if (isSearching) {
      searchCourse(searchTerm).finally(() => setIsLoading(false));
    } else {
      getCourses(currentPage).finally(() => setIsLoading(false));
    }
  }, [currentPage, getCourses, searchCourse, isSearching, searchTerm]);

  const openModal = (courseId: string) => {
    setIsModalOpen(true);
    setCourseId(courseId);
  };

  const closeModal = () => setIsModalOpen(false);

  const onClean = () => {
    setName("");
    setSearchTerm("");
    setIsSearching(false);
    setCurrentPage(0);
  };

  const onReset = () => {
    if (name === "") return;

    onClean();
    getCourses(0);
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deleteCourse(courseId);
      toast("Curso excluído com sucesso!", {
        position: "top-center",
        type: "success",
      });
      const newPage =
        currentPage > 0 && courses.length === 1 ? currentPage - 1 : currentPage;
      setCurrentPage(newPage);
      getCourses(newPage);
    } catch (error) {
      toast("Ocorreu um erro ao tentar excluir o curso!", {
        position: "top-center",
        type: "error",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const onSubmit = async (e: FormEventType) => {
    e.preventDefault();
    if (validateEmptyString(name)) {
      toast.error("Digite um nome para filtrar!");
      onClean();
      nameInput.current;
      return;
    }

    try {
      setIsLoading(true);
      await searchCourse(name);
      setIsSearching(true);
      setSearchTerm(name);
      setCurrentPage(0);
    } catch (error) {
      toast.error("Erro ao buscar curso!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = (page: number) => setCurrentPage(page);

  const onNext = () => {
    if (currentPage < totalPage - 1) setCurrentPage((prev) => prev + 1);
  };

  const onPrev = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

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

      <CoursesFilter
        onSubmit={onSubmit}
        name={name}
        setName={setName}
        nameInput={nameInput}
        onReset={onReset}
      />

      {courses.length === 0 ? (
        <NotFound
          message={
            isSearching
              ? `Nenhum curso encontrado para "${searchTerm}"!`
              : "Nenhum curso foi encontrado!"
          }
        />
      ) : (
        <>
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
              {courses.map((course: CursoType, index: number) => (
                <tr key={index}>
                  <td>{course.nome}</td>
                  <td className="table-actions">
                    <Link to="/cursos/editar-curso" state={course}>
                      <i className="fa-solid fa-pen-to-square icons-action"></i>
                    </Link>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => openModal(course.id!)}
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

export { ListCourses };
