import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import "./styles.css";
import { useState } from "react";
import { Modal } from "../../../ui/modal";

const ListPermissions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

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
      {isModalOpen && (
        <Modal
          message="Tem certeza que deseja excluir esta permissão?"
          cancelOnClick={closeModal}
        />
      )}
      <div className="add-button">
        <Link to="/permissoes/nova-permissao">
          <Button type="success" label="Adicionar" />
        </Link>
      </div>
      <h1>Permissões</h1>

      <div className="filter flex-column-gap20">
        <span>Filtros</span>
        <form action="" className="form-filter">
          <Input placeholder="Descrição" />

          <div className="filter-buttons">
            <Input type="submit" variant="bgInfo" value="Buscar" />
            <Input type="reset" variant="bgNeutral" value="Limpar" />
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
            <th className="table-actions action-column">Ações</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission, index): any => (
            <tr key={index}>
              <td>{permission.role}</td>
              <td>{permission.description}</td>
              <td className="table-actions action-column">
                <Link to="/permissoes/editar-permissao">
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

export { ListPermissions };
