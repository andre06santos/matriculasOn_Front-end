import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EditCourse = () => {
  const { state } = useLocation();
  const { course } = state;

  const navigate = useNavigate();
  const [name, setName] = useState(course.name);

  useEffect(() => {
    setName(course.name);
  }, [course]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedCourse = { ...course, name };
    navigate("/cursos", {
      state: { updatedCourse },
    });
  };

  return (
    <div className="flex-column-gap20">
      <h1>Editar curso</h1>
      <form className="form-edit flex-column-gap20" onSubmit={handleSubmit}>
        <div className="flex-column-gap20">
          <Input
            label="Nome"
            type="text"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
        </div>
        <div className="form-actions-edit flex-column-gap20">
          <Input type="reset" variant="bgNeutral" value="Limpar" />
          <Link to="/cursos">
            <Button type="cancel" label="Cancelar" />
          </Link>
          <Input type="submit" variant="bgSuccess" value="Salvar" />
        </div>
      </form>
    </div>
  );
};

export { EditCourse };
