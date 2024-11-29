import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleChangeCourseName } from "../../../modules/courseFormValidation";

const CourseRegistration = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [errorsMessages, setErrorsMessages] = useState({});

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const listaErros = Object.values(errorsMessages).filter(
      (error) => error !== ""
    );

    if (listaErros.length > 0) {
      console.log(listaErros[0]);

      return;
    } else {
      navigate("/cursos");
    }
  };

  return (
    <div className="flex-column-gap20">
      <h1>Cadastrar curso</h1>
      <form
        className="form-registration flex-column-gap20"
        onSubmit={handleSubmit}
      >
        <div className="flex-column-gap20">
          <Input
            label="Nome"
            type="text"
            id="nome"
            required
            value={nome}
            onChange={(e: any) =>
              handleChangeCourseName(e.target.value, setErrorsMessages, setNome)
            }
          />
        </div>
        <div className="form-actions-registration flex-column-gap20">
          <Input type="reset" variant="bgNeutral" value="Limpar" />
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
