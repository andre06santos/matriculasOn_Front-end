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
import { Pagination } from "../../../ui/paginacao";

const ListPermissions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    permissions,
    getPermissions,
    searchPermission,
    deletePermission,
    totalPage,
    totalElements,
  } = useAdmin();
  const [descricao, setDescricao] = useState("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [permissionId, setPermissionId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
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
    if (isSearching) {
      searchPermission(searchTerm, currentPage).finally(() =>
        setIsLoading(false)
      );
    }
  }, [currentPage, searchTerm, isSearching, searchPermission]);

  useEffect(() => {
    if (descricao === "" && currentPage == 0) {
      setIsSearching(false);
      getPermissions();
      onClean();
    }
  }, [descricao, currentPage]);

  const onSubmit = async (e: FormEventType) => {
    e.preventDefault();

    const emptyField = validateEmptyString(descricao);

    if (emptyField) {
      toast("Digite uma descrição para filtrar!", {
        position: "top-center",
        type: "error",
      });
      onClean();
      onFocus();
      return;
    }

    try {
      setIsLoading(true);
      setCurrentPage(0);
      await searchPermission(descricao, 0);
      setIsSearching(true);
      setSearchTerm(descricao);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast("Erro ao buscar permissões!", {
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

      const newPage =
        currentPage > 0 && permissions.length === 1
          ? currentPage - 1
          : currentPage;
      setCurrentPage(newPage);
      searchPermission(searchTerm, newPage);
    } catch (error) {
      setIsLoading(false);
      toast("Erro ao tentar excluir permissão!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    } finally {
      closeModal();
    }
  };

  const onPageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      setIsSearching(true);
      setIsLoading(true);
      searchPermission(searchTerm, page).finally(() => setIsLoading(false));
    }
  };

  const onNext = () => {
    if (currentPage < totalPage - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setIsSearching(true);
      setIsLoading(true);
      searchPermission(searchTerm, newPage).finally(() => setIsLoading(false));
    }
  };

  const onPrev = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setIsSearching(true);
      setIsLoading(true);
      searchPermission(searchTerm, newPage).finally(() => setIsLoading(false));
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

      <PermissionsFilter
        onSubmit={onSubmit}
        descricao={descricao}
        setDescricao={setDescricao}
        descricaoInput={descricaoInput}
        onReset={onReset}
      />

      {totalElements === 0 ? (
        <NotFound message="Nenhuma permissão encontrada!" />
      ) : (
        <>
          <p>
            {isSearching && searchTerm
              ? `Total de permissões encontradas ao filtrar por "${searchTerm}": `
              : "Total de permissões encontradas: "}
            <span className="permissions-quantity">{totalElements}</span>
          </p>

          <table className="table">
            <thead className="table-header">
              <tr>
                <th>Role</th>
                <th>Descrição</th>
                <th className="table-actions">Ações</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission: PermissionsType, index: number) => (
                <tr key={index}>
                  <td>{permission.role}</td>
                  <td>{permission.descricao}</td>
                  <td className="table-actions">
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

export { ListPermissions };
