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
  const nameInput = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [courseId, setCourseId] = useState<string>("");
  const [currentPage, setcurrentPage] = useState<number>(0);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);

  console.log(`
    ${currentPage}
    ${totalCourses}
    ${totalPage}
    `);

  const openModal = (courseId: string) => {
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
    setcurrentPage(0);
  };

  const onFocus = () => nameInput.current?.focus();

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
      toast("Curso excluído com sucesso!", {
        position: "top-center",
        type: "success",
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast("Ocorreu um erro ao tentar excluir o curso!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    } finally {
      closeModal();
    }
  };

  const onSubmit = async (e: FormEventType) => {
    e.preventDefault();

    const emptyField = validateEmptyString(name);

    if (emptyField) {
      toast("Digite um nome para filtrar!", {
        position: "top-center",
        type: "error",
      });
      onClean();
      onFocus();

      return;
    }

    try {
      setIsLoading(true);
      await searchCourse(name);
      setIsSearching(true);
      setSearchTerm(name);
      setcurrentPage(0);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast("Ocorreu um erro ao tentar filtrar curso!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    checkFields();
  }, [name]);

  const currentCourses = courses.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const onPageChange = (page: number) => {
    setcurrentPage(page);
  };

  const onNext = () => {
    if (currentPage < totalPage - 1) {
      setcurrentPage(currentPage + 1);
    }
  };

  const onPrev = () => {
    if (currentPage > 0) {
      setcurrentPage(currentPage - 1);
    }
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
        isSearching ? (
          <NotFound
            message={`A busca por "${searchTerm}" não retornou nenhum curso!`}
          />
        ) : (
          <NotFound message="Nenhum curso foi encontrado!" />
        )
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
              {currentCourses.map((course: CursoType, index: number) => (
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
