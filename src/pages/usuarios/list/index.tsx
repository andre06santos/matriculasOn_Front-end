import { Link } from "react-router-dom";
import "./styles.css";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";

const ListUser = () => {
  const users = [
    {
      username: "marisilcs",
      nome: "Maria da Silva Costa",
      tipo: "Aluno",
      status: true,
    },
    {
      username: "luanmst",
      nome: "Luan Monteiro de Sá",
      tipo: "Administrador",
      status: true,
    },
    {
      username: "lari1988",
      nome: "Joana Larissa Lima",
      tipo: "Aluno",
      status: false,
    },
  ];

  const options = [
    { label: "Aluno", path: "/alunos/aluno-novo" },
    { label: "Administrador", path: "/administrador" },
  ];

  const statusOptions = [
    { id: 0, text: "Inativo" },
    { id: 1, text: "Ativo" },
  ];


  return (
    <div className="flex-column-gap20">
      <div className="add-button">
        <Button label="Adicionar" type="success" selectOptions={options} />
      </div>
      <h1>Usuários</h1>

      <div className="filter flex-column-gap20">
        <p>Filtros</p>
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
        <span className="permissions-quantity">3</span>
      </p>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Status</th>
            <th className="last-element">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index): any => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.nome}</td>
              <td>{user.tipo}</td>
              <td className={user.status ? "td-ativo" : "td-inativo"}>
                {user.status ? "Ativo" : "Inativo"}
              </td>
              <td className="table-actions action-column last-element">
                <i className="fa-solid fa-pen-to-square"></i>
                <i className="fa-solid fa-trash-can"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { ListUser };
