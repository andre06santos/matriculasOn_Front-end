import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { handleCourseName } from "../../../modules/courseFormValidation";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import "./styles.css";

const EditCourse = () => {
  const { state: course } = useLocation();
  const { editCourse } = useAdmin();
  const navigate = useNavigate();

  const [name, setName] = useState(course.nome);
  const [errorMessages, setErrorMessages] = useState([]);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (errorMessages.length > 0) {
      const firstError = Object.values(errorMessages[0])[0];
      console.log(firstError);
    }

    try {
      const newCourse = {
        nome: name,
      };

      await editCourse({ id: course.id, newCourse });

      console.log("Curso editado com sucesso!");

      navigate("/cursos");
    } catch (error) {
      console.log("Ocorreu um erro ao tentar editar o curso!");
      console.error((error as Error).message);
    }
  };

  const onClean = () => {
    setName("");
    setErrorMessages([]);
  };

  return (
    <div className="flex-column-gap20">
      <h1>Editar curso</h1>
      <form className="form-edit flex-column-gap20" onSubmit={onSubmit}>
        <div className="flex-column-gap20">
          <Input
            label="Nome"
            type="text"
            required
            value={name}
            onChange={(e: any) =>
              handleCourseName(e.target.value, setErrorMessages, setName)
            }
            onFocus={(e: any) => e.target.select()}
          />
        </div>
        <div className="form-actions-edit flex-column-gap20">
          <Input
            type="reset"
            variant="bgNeutral"
            value="Limpar"
            onClick={onClean}
          />
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
