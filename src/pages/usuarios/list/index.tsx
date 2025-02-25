import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { Button } from "../../../ui/button";
import { Modal } from "../../../ui/modal";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { Filter } from "./filter";
import { NotFound } from "../../../ui/not-found";
import { validateEmptyString } from "../../../modules/formValidationUtils";
import { Spinner } from "../../../ui/spinner";
import { toast } from "react-toastify";
import {
  UserType,
  StatusOption,
  FormEventType,
} from "../../../modules/administradores/infrastructure/types";
import { Pagination } from "../../../ui/paginacao";

const ListUser = () => {
  const { users, getUsers, searchUser, deleteUser, totalPage, totalElements } =
    useAdmin();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [status, setStatus] = useState<StatusOption>({ label: "", value: "" });

  const [searchTerm, setSearchTerm] = useState<{
    username: string;
    nome: string;
    status: StatusOption;
  }>({
    username: "",
    nome: "",
    status: { label: "", value: "" },
  });

  const [userId, setUserId] = useState<string>("");
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const nameInput = useRef<HTMLInputElement | null>(null);
  const usernameInput = useRef<HTMLInputElement | null>(null);
  const statusInput = useRef<HTMLSelectElement | null>(null);

  let statusMessage;

  if (searchTerm.username) {
    statusMessage = `por "${searchTerm.username}"`;
  } else if (searchTerm.nome) {
    statusMessage = `por "${searchTerm.nome}"`;
  } else if (searchTerm.status.label) {
    statusMessage = "pelo status";
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (userId: string) => {
    setIsModalOpen(true);
    setUserId(userId);
  };

  const onClean = () => {
    setUsername("");
    setNome("");
    setStatus({ label: "", value: "" });
    setSearchTerm({
      username: "",
      nome: "",
      status: { label: "", value: "" },
    });
    setIsSearching(false);
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deleteUser(userId);
      toast.success("Usuário excluído com sucesso!");

      const newPage =
        currentPage > 0 && users.length === 1 ? currentPage - 1 : currentPage;
      setCurrentPage(newPage);

      searchUser(username, nome, status, newPage);
    } catch (error) {
      toast.error("Ocorreu um erro ao tentar excluir o cadastro do usuário!");
      console.error(error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const onReset = () => {
    if (nome === "" && username === "" && !status.value) return;
    onClean();
    getUsers();
  };

  useEffect(() => {
    if (
      nome === "" &&
      username === "" &&
      status.value === "" &&
      currentPage === 0 &&
      !isLoadingUsers
    ) {
      setIsSearching(false);
      getUsers();
    }
  }, [nome, username, status, currentPage]);

  useEffect(() => {
    if (isSearching) {
      searchUser(
        searchTerm.username,
        searchTerm.nome,
        searchTerm.status,
        currentPage
      ).finally(() => setIsLoading(false));
      setIsLoadingUsers(false);
    }
  }, [currentPage, searchTerm, isSearching, searchUser]);
  const onSubmit = async (e: FormEventType) => {
    e.preventDefault();

    const emptyFieldName = validateEmptyString(nome);
    const emptyFieldUsername = validateEmptyString(username);

    if (emptyFieldName && emptyFieldUsername && !status.value) {
      toast("Preencha um dos campos para filtrar!", {
        position: "top-center",
        type: "error",
      });
      onClean();
      setIsLoadingUsers(true);
      return;
    }

    try {
      setIsLoading(true);
      setCurrentPage(0);
      await searchUser(username, nome, status);
      setIsSearching(true);
      setSearchTerm({ username, nome, status });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast("Ocorreu um erro ao tentar filtrar usuários!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    }
  };

  const userStatusLabel = (status: boolean) => {
    return status ? "Ativo" : "Inativo";
  };

  const onPageChange = (page: number) => {
    if (page != currentPage) {
      setIsSearching(true);
      setIsLoading(true);
      setCurrentPage(page);
      searchUser(username, nome, status, page);
    }
  };

  const onNext = () => {
    if (currentPage < totalPage - 1) {
      const nextPage = currentPage + 1;
      setIsSearching(true);
      setIsLoading(true);
      setCurrentPage(nextPage);
      searchUser(username, nome, status, nextPage);
    }
  };

  const onPrev = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      setIsSearching(true);
      setIsLoading(true);
      setCurrentPage(prevPage);
      searchUser(username, nome, status, prevPage);
    }
  };

  return (
    <div className="flex-column-gap20">
      {isLoading && <Spinner />}

      {isModalOpen && (
        <Modal
          message="Tem certeza que deseja excluir o cadastro deste usuário?"
          onCancel={closeModal}
          onDelete={onDelete}
        />
      )}
      <div className="add-button">
        <Button label="Adicionar" type="success" selectOptions={options} />
      </div>
      <h1>Usuários</h1>

      {totalElements === 0 ? (
        isSearching ? (
          <>
            <Filter
              onSubmit={onSubmit}
              username={username}
              setUsername={setUsername}
              usernameInput={usernameInput}
              name={nome}
              setName={setNome}
              nameInput={nameInput}
              statusOptions={statusOptions}
              status={status}
              statusInput={statusInput}
              setStatus={setStatus}
              onReset={onReset}
            />
            <NotFound
              message={`A busca ${statusMessage} não retornou nenhum usuario!`}
            />
          </>
        ) : (
          <NotFound message="Nenhum usuário foi encontrado!" />
        )
      ) : (
        <>
          <Filter
            onSubmit={onSubmit}
            username={username}
            setUsername={setUsername}
            usernameInput={usernameInput}
            name={nome}
            setName={setNome}
            nameInput={nameInput}
            statusOptions={statusOptions}
            status={status}
            statusInput={statusInput}
            setStatus={setStatus}
            onReset={onReset}
          />

          <p>
            {isSearching && statusMessage
              ? `Total de usuários encontrados ao filtrar por ${statusMessage}: `
              : "Total de usuários encontrados:"}
            <span className="permissions-quantity">{totalElements}</span>
          </p>

          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: UserType, index: number) => {
                const tipoCapitalizado = upperCaseToCapitalCase(
                  user.pessoa.tipo
                );
                return (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.pessoa.nome}</td>
                    <td>{tipoCapitalizado}</td>
                    <td className={user.status ? "td-ativo" : "td-inativo"}>
                      <span className="status-label">
                        {userStatusLabel(user.status!)}
                      </span>
                    </td>
                    <td className="table-actions action-column">
                      <Link
                        to={
                          user.pessoa.tipo === "ALUNO"
                            ? "/alunos/editar-aluno"
                            : "/administradores/editar-administrador"
                        }
                        state={user}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <i
                        className="fa-solid fa-trash-can"
                        onClick={() => openModal(user.id!)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
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

export { ListUser };

const options = [
  { label: "Aluno", path: "/usuarios/alunos/novo-aluno" },
  {
    label: "Administrador",
    path: "/usuarios/administradores/novo-administrador",
  },
];

const upperCaseToCapitalCase = (userType: string): string => {
  return userType.charAt(0).toUpperCase() + userType.slice(1).toLowerCase();
};

const statusOptions: StatusOption[] = [
  { label: "Ativo", value: "true" },
  { label: "Inativo", value: "false" },
];
