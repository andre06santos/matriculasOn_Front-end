import { Link } from "react-router-dom";
import "./styles.css";
import { Button } from "../../../ui/button";
import { useRef, useEffect, useState } from "react";
import { Modal } from "../../../ui/modal";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { Filter } from "./filter";
import { NotFound } from "../../../ui/not-found";
import { validateEmptyString } from "../../../modules/formValidationUtils";
import { Spinner } from "../../../ui/spinner";
import { toast } from "react-toastify";

const ListUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users, getUsers, searchUser, deleteUser } = useAdmin();
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [nome, setNome] = useState("");
  const [status, setStatus] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState({
    username: "",
    nome: "",
    status: "",
  });

  const [userId, setUserId] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const nameInput = useRef<any>(null);
  const usernameInput = useRef<any>(null);

  let statusMessage;

  if (searchTerm.username) {
    statusMessage = `por "${searchTerm.username}"`;
  } else if (searchTerm.nome) {
    statusMessage = `por "${searchTerm.nome}"`;
  } else if (searchTerm.status) {
    statusMessage = "pelo status";
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (userId: any) => {
    setIsModalOpen(true);
    setUserId(userId);
  };

  const isAluno = (tipo: any) => {
    return tipo === "Aluno";
  };

  const onClean = () => {
    setUsername("");
    setNome("");
    setStatus(null);
    setIsSearching(false);
  };

  const checkFields = () => {
    if (nome === "" && username === "" && !status) {
      getUsers();
      onClean();
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deleteUser(userId);
      setIsLoading(false);
      toast("Usuário excluído com sucesso!", {
        position: "top-center",
        type: "success",
      });
    } catch (error) {
      setIsLoading(false);
      toast("Ocorreu um erro ao tentar excluir o cadastro do usuário!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    } finally {
      closeModal();
    }
  };

  const onReset = () => {
    if (nome === "" && username === "" && !status) return;

    onClean();
    getUsers();
  };

  useEffect(() => {
    checkFields();
  }, [nome, username, status]);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const emptyFieldName = validateEmptyString(nome);
    const emptyFieldUsername = validateEmptyString(username);

    if (emptyFieldName && emptyFieldUsername && !status) {
      toast("Preencha um dos campos para filtrar!", {
        position: "top-center",
        type: "error",
      });
      onClean();

      return;
    }

    try {
      setIsLoading(true);
      await searchUser(username, nome, status?.value);
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
  const isActiveStatus = (status: any) => {
    if (status === "ATIVO") {
      return true;
    } else if (status === "INATIVO") {
      return false;
    }
  };

  const userStatusLabel = (status: any) => {
    if (status === "ATIVO") {
      return "Ativo";
    } else if (status === "INATIVO") {
      return "Inativo";
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

      {users.length === 0 ? (
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
            setStatus={setStatus}
            onReset={onReset}
          />

          <p>
            {isSearching
              ? `Total de usuários encontrados ao filtrar ${statusMessage}: `
              : "Total de usuários encontrados:"}
            <span className="permissions-quantity">{users.length}</span>
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
              {users.map((user: any, index: any) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.nome}</td>
                  <td>{user.tipo}</td>
                  <td
                    className={
                      isActiveStatus(user.status) ? "td-ativo" : "td-inativo"
                    }
                  >
                    <span className="status-label">
                      {userStatusLabel(user.status)}
                    </span>
                  </td>
                  <td className="table-actions action-column">
                    <Link
                      to={
                        isAluno(user.tipo)
                          ? "/alunos/editar-aluno"
                          : "/administradores/editar-administrador"
                      }
                      state={user}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => openModal(user.id)}
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

export { ListUser };

const options = [
  { label: "Aluno", path: "/alunos/novo-aluno" },
  { label: "Administrador", path: "/administradores/novo-administrador" },
];

const statusOptions = [
  { label: "Ativo", value: "ATIVO" },
  { label: "Inativo", value: "INATIVO" },
];
