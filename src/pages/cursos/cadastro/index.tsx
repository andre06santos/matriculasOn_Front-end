import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { handleCourseName } from "../../../modules/courseFormValidation";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import "./styles.css";

const CourseRegistration = () => {
  const navigate = useNavigate();
  const { addCourse } = useAdmin();
  const nameInput = useRef<any>(null);

  const [name, setName] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const onFocus = () => nameInput.current.focus();

  const onClean = () => {
    setName("");
    setErrorMessages([]);
    onFocus();
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (errorMessages.length > 0) {
      const firstError = Object.values(errorMessages[0])[0];
      console.log(firstError);
    }

    try {
      await addCourse({ nome: name });

      console.log("Curso cadastrado com sucesso!");

      navigate("/cursos");
    } catch (error) {
      console.log("Ocorreu um erro ao tentar cadastrar o curso!");
      console.error((error as Error).message);
    }
  };

  return (
    <div className="flex-column-gap20">
      <h1>Cadastrar curso</h1>
      <form className="form-registration flex-column-gap20" onSubmit={onSubmit}>
        <div className="flex-column-gap20">
          <Input
            label="Nome"
            type="text"
            id="nome"
            required
            value={name}
            onChange={(e: any) =>
              handleCourseName(e.target.value, setName)
            }
            onFocus={(e: any) => e.target.select()}
            autoFocus
            ref={nameInput}
          />
        </div>
        <div className="form-actions-registration flex-column-gap20">
          <Input
            type="reset"
            variant="bgNeutral"
            value="Limpar"
            onClick={onClean}
          />
          <Link to="/cursos">
            <Button type="cancel" label="Cancelar" />
          </Link>
          <Input type="submit" variant="bgSuccess" value="Cadastrar" />
        </div>
      </form>
    </div>
  );
};

export { CourseRegistration };
