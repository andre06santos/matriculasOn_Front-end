import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../../../ui/modal";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { validateEmptyString } from "../../../modules/formValidationUtils";
import { PermissionsFilter } from "./filter";
import { NotFound } from "../../../ui/not-found";
import { Spinner } from "../../../ui/spinner";
import { toast } from "react-toastify";
import {
  FormEventType,
  PermissionsType,
} from "../../../modules/administradores/infrastructure/types";

const ListPermissions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { permissions, getPermissions, searchPermission, deletePermission } =
    useAdmin();
  const [descricao, setDescricao] = useState("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [permissionId, setPermissionId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const descricaoInput = useRef<HTMLInputElement | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (permissionId: string) => {
    setIsModalOpen(true);
    setPermissionId(permissionId);
  };

  const onClean = () => {
    setDescricao("");
    setSearchTerm("");
    setIsSearching(false);
  };

  const onFocus = () => descricaoInput.current?.focus();

  const onReset = () => {
    if (descricao === "") return;

    onClean();
    onFocus();
    getPermissions();
  };

  useEffect(() => {
    if (descricao === "") {
      setIsSearching(false);
      getPermissions();
    }
  }, [descricao]);

  const onSubmit = async (e: FormEventType) => {
    e.preventDefault();

    const emptyField = validateEmptyString(descricao);

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
      await searchPermission(descricao);
      setIsSearching(true);
      setSearchTerm(descricao);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast("Ocorreu um erro ao tentar filtrar permissões!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deletePermission(permissionId);
      setIsLoading(false);
      toast("Permissão excluída com sucesso!", {
        position: "top-center",
        type: "success",
      });
    } catch (error) {
      setIsLoading(false);
      toast("Ocorreu um erro ao tentar excluir a permissão!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="flex-column-gap20">
      {isLoading && <Spinner />}

      {isModalOpen && (
        <Modal
          message="Tem certeza que deseja excluir esta permissão?"
          onCancel={closeModal}
          onDelete={onDelete}
        />
      )}
      <div className="add-button">
        <Link to="/permissoes/nova-permissao">
          <Button type="success" label="Adicionar" />
        </Link>
      </div>
      <h1>Permissões</h1>

      {permissions.length === 0 ? (
        isSearching ? (
          <>
            <PermissionsFilter
              onSubmit={onSubmit}
              descricao={descricao}
              setDescricao={setDescricao}
              descricaoInput={descricaoInput}
              onReset={onReset}
            />
            <NotFound
              message={`A busca por "${searchTerm}" não retornou nenhuma permissão!`}
            />
          </>
        ) : (
          <NotFound message="Nenhuma permissão foi encontrada!" />
        )
      ) : (
        <>
          <PermissionsFilter
            onSubmit={onSubmit}
            descricao={descricao}
            setDescricao={setDescricao}
            descricaoInput={descricaoInput}
            onReset={onReset}
          />

          <p>
            {isSearching
              ? `Total de permissões encontradas ao filtrar por "${searchTerm}": `
              : "Total de permissões encontradas: "}
            <span className="permissions-quantity">{permissions.length}</span>
          </p>

          <table className="table">
            <thead className="table-header">
              <tr>
                <th>Role</th>
                <th>Descrição</th>
                <th className="table-actions action-column">Ações</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission: PermissionsType, index: number) => (
                <tr key={index}>
                  <td>{permission.role}</td>
                  <td>{permission.descricao}</td>
                  <td className="table-actions action-column">
                    <Link to="/permissoes/editar-permissao" state={permission}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => openModal(permission.id!)}
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

export { ListPermissions };
