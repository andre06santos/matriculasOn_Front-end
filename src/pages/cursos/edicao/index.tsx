import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleChangeCourseName } from "../../../modules/courseFormValidation";

const EditCourse = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const listaErros = Object.values(errorMessages).filter(
      (error) => error !== ""
    );

    if (listaErros.length > 0) {
      console.log(listaErros[0]);
    } else {
      navigate("/cursos");
    }
  };

  const onClean = (e: any) => {
    e.preventDefault();

    setNome("");
    setErrorMessages({});
  };

  return (
    <div className="flex-column-gap20">
      <h1>Editar curso</h1>
      <form className="form-edit flex-column-gap20" onSubmit={handleSubmit}>
        <div className="flex-column-gap20">
          <Input
            label="Nome"
            type="text"
            required
            value={nome}
            onChange={(e: any) =>
              handleChangeCourseName(e.target.value, setErrorMessages, setNome)
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
          <Input type="submit" variant="bgSuccess" value="Cadastrar" />
        </div>
      </form>
    </div>
  );
};

export { EditCourse };
