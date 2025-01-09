import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { handleCourseName } from "../../../modules/courseFormValidation";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { Spinner } from "../../../ui/spinner";
import "./styles.css";
import { toast } from "react-toastify";

const CourseRegistration = () => {
  const navigate = useNavigate();
  const { addCourse } = useAdmin();
  const nameInput = useRef<any>(null);

  const [name, setName] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      toast(`${firstError}`, {
        position: "top-center",
        type: "error",
      });
    }

    try {
      setIsLoading(true);
      await addCourse({ nome: name });

      setIsLoading(false);
      toast("Curso criado com sucesso!", {
        position: "top-center",
        type: "success",
      });
      navigate("/cursos");
    } catch (error) {
      setIsLoading(false);
      toast("Ocorreu um erro ao criar o curso!", {
        position: "top-center",
        type: "error",
      });
      console.error((error as Error).message);
    }
  };

  return (
    <div className="flex-column-gap20">
      {isLoading && <Spinner />}

      <h1>Cadastrar curso</h1>
      <form className="form-registration flex-column-gap20" onSubmit={onSubmit}>
        <div className="flex-column-gap20">
          <Input
            label="Nome"
            type="text"
            id="nome"
            required
            value={name}
            onChange={(e: any) => handleCourseName(e.target.value, setName)}
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
