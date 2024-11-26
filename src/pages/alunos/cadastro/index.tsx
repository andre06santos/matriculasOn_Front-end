import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Link } from "react-router-dom";
const RegisterStudent = () => {
  const cursoOptions = [
    { id: 1, text: "Análise e Desenvolvimento de Sistemas" },
    { id: 2, text: "Engenharia de Software" },
    { id: 3, text: "Redes de Computadores" },
    { id: 4, text: "Tecnologia da Informação" },
  ];

  return (
    <div className="flex-column-gap20">
      <h1>Cadastrar aluno</h1>
      <form className="form">
        <div className="input-group">
          <Input label="CPF" type="text" />
          <Input label="Matrícula" type="text" />
          <Input label="Nome" type="text" />
        </div>
        <div className="input-group">
          <Input label="Username" type="text" />
          <Input label="Email" type="text" />
          <Input label="Curso" selectOptions={cursoOptions} />
        </div>
        <div className="input-group">
          <Input label="Senha" type="password" />
          <Input label="Confirmar senha" type="password" />
        </div>
        <div className="form-actions flex-column-gap20">
          <Input type="reset" variant="bgNeutral" value="Limpar" />
          <Link to="/alunos">
            <Button type="cancel" label="Cancelar" />
          </Link>
          <Input type="submit" variant="bgSuccess" value="Cadastrar" />
        </div>
      </form>
    </div>
  );
};

export { RegisterStudent };
