import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import "./styles.css";

const ListPermissions = () => {
  const permissions = [
    {
      role: "CADASTRAR_USUARIO",
      description: "Cadastra usuario",
    },
    {
      role: "EDITAR_CADASTRO_ALUNO",
      description: "Edita o cadastro de um aluno",
    },
    {
      role: "EDITAR_CADASTRO_ALUNO",
      description: "Edita o cadastro de um aluno",
    },
  ];

  return (
    <div className="flex-column-gap20">
      <div className="add-button">
        <Link to="/permissoes/nova-permissao">
          <Button type="success" label="Adicionar" />
        </Link>
      </div>
      <h1>Permissões</h1>

      <div className="filter">
        <h1></h1>
        <form action="" className="form-filter">
          <Input placeholder="Descrição" />

          <div className="filter-buttons">
            <Input type="submit" variant="" value="Buscar" />
            <Input type="reset" value="Limpar" />
          </div>
        </form>
      </div>

      <p>
        Total de permissões encontradas:{" "}
        <span className="permissions-quantity">3</span>
      </p>

      <table className="table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission, index): any => (
            <tr key={index}>
              <td>{permission.role}</td>
              <td>{permission.description}</td>
              <td className="table-actions">
                <Link to="/permissoes/editar-permissao">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <i className="fa-solid fa-trash-can"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paginacao-component">
        <div className="paginacao">
          <Button label="<" />
          <Button label="1" />
          <Button label=">" />
        </div>
      </div>
    </div>
  );
};

export { ListPermissions };
