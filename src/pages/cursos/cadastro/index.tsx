import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { handleCourseName } from "../../../modules/courseFormValidation";
import { useAdmin } from "../../../modules/administradores/views/hooks/use-administrador";
import { Spinner } from "../../../ui/spinner";
import "./styles.css";
import { toast } from "react-toastify";
import {
  cursoType,
  ChangeEventType,
  FormEventType,
} from "../../../modules/administradores/infrastructure/types";

const CourseRegistration = () => {
  const navigate = useNavigate();
  const { addCourse } = useAdmin();
  const nameInput = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFocus = () => nameInput.current?.focus();

  const onClean = () => {
    setName("");
    onFocus();
  };

  const onSubmit = async (e: FormEventType) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const newCourse: cursoType = { nome: name };
      await addCourse(newCourse);

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
            onChange={(e: ChangeEventType) =>
              handleCourseName(e.target.value, setName)
            }
            onFocus={(e: ChangeEventType) => e.target.select()}
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
