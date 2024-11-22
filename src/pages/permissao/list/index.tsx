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
        <Button type="success" label="Adicionar" />
      </div>
      <h1>Permissões</h1>

      <form action="" className="form-filter">
        <Input label="Filtro" placeholder="Descrição" />

        <div className="filter__buttons">
          <Input type="submit" value="Buscar" />
          <Input type="reset" value="Limpar" />
        </div>
      </form>

      <p>
        Total de permissões encontradas:{" "}
        <span className="permissions-quantity">3</span>
      </p>

      <table className="table">
        <thead className="table__header">
          <th>Role</th>
          <th>Descrição</th>
          <th>Ações</th>
        </thead>
        <tbody>
          {permissions.map((permission, index): any => (
            <tr key={index}>
              <td>{permission.role}</td>
              <td>{permission.description}</td>
              <td className="table-actions">
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

export { ListPermissions };
