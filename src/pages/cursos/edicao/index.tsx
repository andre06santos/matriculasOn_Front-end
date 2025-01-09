import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { handleCourseName } from "../../../modules/courseFormValidation";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import "./styles.css";
import { Spinner } from "../../../ui/spinner";
import { toast } from "react-toastify";

const EditCourse = () => {
  const { state: course } = useLocation();
  const { editCourse } = useAdmin();
  const navigate = useNavigate();

  const [name, setName] = useState(course.nome);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (errorMessages.length > 0) {
      const firstError = Object.values(errorMessages[0])[0];
      toast(`${firstError}`, {
        position: "top-center",
        type: "error",
      });
    }

    try {
      setIsLoading(true);
      const newCourse = {
        nome: name,
      };

      await editCourse({ id: course.id, newCourse });

      setIsLoading(false);
      toast("Curso editado com sucesso!", {
        position: "top-center",
        type: "success",
      });
      navigate("/cursos");
    } catch (error) {
      setIsLoading(false);
      toast("Ocorreu um erro ao tentar editar o curso!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    }
  };

  return (
    <div className="flex-column-gap20">
      {isLoading && <Spinner />}

      <h1>Editar curso</h1>
      <form className="form-edit flex-column-gap20" onSubmit={onSubmit}>
        <div className="flex-column-gap20">
          <Input
            label="Nome"
            type="text"
            required
            value={name}
            onChange={(e: any) => handleCourseName(e.target.value, setName)}
            onFocus={(e: any) => e.target.select()}
          />
        </div>
        <div className="form-actions-edit flex-column-gap20">
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
