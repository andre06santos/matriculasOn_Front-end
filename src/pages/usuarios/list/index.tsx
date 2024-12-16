import { Link } from "react-router-dom";
import "./styles.css";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { useEffect, useState } from "react";
import { Modal } from "../../../ui/modal";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";

const ListUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users, getUser } = useAdmin();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const isAluno = (tipo: any) => {
    return tipo === "Aluno";
  };

  useEffect(() => {
    getUser();
  }, []);

  const options = [
    { label: "Aluno", path: "/alunos/novo-aluno" },
    { label: "Administrador", path: "/administradores/novo-administrador" },
  ];

  const statusOptions = [
    { label: "Ativo", value: "ATIVO" },
    { label: "Inativo", value: "INATIVO" },
  ];

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

      <div className="filter flex-column-gap20">
        <span>Filtros</span>
        <form className="form-filter">
          <Input type="text" placeholder="Username" />
          <Input type="text" placeholder="Nome" />
          <Input selectOptions={statusOptions} />
          <div className="form-actions">
            <Input type="submit" variant="bgInfo" value="Buscar" />
            <Input type="reset" variant="bgNeutral" value="Limpar" />
          </div>
        </form>
      </div>

      <p>
        Total de usuários encontradas:{" "}
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
              <td className={user.status ? "td-ativo" : "td-inativo"}>
                {user.status ? "Ativo" : "Inativo"}
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
                <i className="fa-solid fa-trash-can" onClick={openModal}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { ListUser };
