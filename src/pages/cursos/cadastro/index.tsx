import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const CourseRegistration = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");

  const verificarApenasLetras = (nome: any) => {
    const apenasLetras = /^[a-zA-ZÀ-ÿ]+$/.test(nome);
    return apenasLetras;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const novoErro: any = {};

    novoErro["nomeErro"] = verificarApenasLetras(nome)
      ? ""
      : "Nome so pode ter letras";

    const listaErros = Object.values(novoErro).filter((error) => error !== "");

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
            onChange={(e: any) => setNome(e.target.value)}
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
