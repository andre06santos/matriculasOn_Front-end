import { Link } from "react-router-dom";
import "./styles.css";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { useRef, useEffect, useState } from "react";
import { Modal } from "../../../ui/modal";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { Filter } from "./filter";
import { NotFound } from "../../../ui/not-found";

const ListUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users, getUsers, searchUser } = useAdmin();

  const [username, setUsername] = useState("");
  const [nome, setNome] = useState("");
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState({
    username: "",
    nome: "",
    status: "",
  });

  const [isSearching, setIsSearching] = useState(false);

  const nameInput = useRef<any>(null);
  const usernameInput = useRef<any>(null);

  let statusMessage;

  if (searchTerm.username) {
    statusMessage = searchTerm.username;
  } else if (searchTerm.nome) {
    statusMessage = searchTerm.nome;
  } else if (searchTerm.status) {
    statusMessage = "Status";
  } else {
    statusMessage = null;
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const isAluno = (tipo: any) => {
    return tipo === "Aluno";
  };

  const onClean = () => {
    setUsername("");
    setNome("");
    setStatus("");
    setIsSearching(false);
  };

  const onReset = () => {
    onClean();
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await searchUser(username, nome, status);
      setIsSearching(true);
      setSearchTerm({ username, nome, status });
    } catch (error) {
      console.log("Ocorreu um erro ao tentar filtrar usuários!");
      console.error((error as Error).message);
    }
  };

  return (
    <div className="flex-column-gap20">
      {isModalOpen && (
        <Modal
          message="Tem certeza que deseja excluir o cadastro deste usuário?"
          onCancel={closeModal}
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
              message={`A busca por "${statusMessage}" não retornou nenhum usuario!`}
            />
          </>
        ) : (
          <NotFound message="Nenhum Usuário foi encontrado!" />
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
              ? `Total de usuários encontrados ao filtrar por "${statusMessage}": `
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
                      user.status === "ATIVO" ? "td-ativo" : "td-inativo"
                    }
                  >
                    {user.status === "ATIVO" ? "Ativo" : "Inativo"}
                  </td>
                  <td className="table-actions action-column">
                    <Link
                      to={
                        isAluno(user.tipo)
                          ? "/alunos/editar-aluno"
                          : "/administradores/editar-administrador"
                      }
                      state={users[index]}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={openModal}
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
