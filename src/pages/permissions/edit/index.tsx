// EditPermission.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import "./styles.css";
import { useState } from "react";

const EditPermission = () => {
  const { state } = useLocation();
  const { permission } = state; 

  const navigate = useNavigate();

  const [role, setRole] = useState(permission.role);
  const [description, setDescription] = useState(permission.description);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!role || !description) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const updatedPermission = { id: permission.id, role, description };

    navigate("/permissoes", {
      state: { updatedPermission },
    });
  };

  return (
    <div className="add-page flex-column-gap20">
      <h1>Editar permissão</h1>

      <form onSubmit={handleSubmit} className="form-edit flex-column-gap20">
        <div className="form-inputs flex-column-gap20">
          <Input
            label="Role"
            value={role}
            onChange={(e: any) => setRole(e.target.value)}
          />
          <Input
            label="Descrição"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-actions-edit flex-column-gap20">
          <Button label="Cancelar" onClick={() => navigate("/permissoes")} />
          <Input type="submit" variant="bgSuccess" value="Editar" />
        </div>
      </form>
    </div>
  );
};

export { EditPermission };
