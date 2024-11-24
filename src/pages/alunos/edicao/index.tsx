import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
const StudentEdit = () => {
  return (
    <div className="flex-column-gap20">
      <h1>Editar aluno</h1>
      <form className="form">
        <div className="container-forms ">
          <Input label="CPF" type="text" />
          <Input label="Matrícula" type="text" />
          <Input label="Nome" type="text" />
        </div>
        <div className="container-forms">
          <Input label="Username" type="text" />
          <Input label="Email" type="text" />
          <Input label="Curso" type="text" />
        </div>
        <div className="container-forms ">
          <Input label="Senha" type="text" />
          <Input label="Confirmar senha" type="text" />
        </div>
        <div className="container-buttons flex-column-gap20">
          <Input type="reset" variant="bgNeutral" value="Limpar" />
          <Button type="cancel" label="Cancelar" />
          <Input type="submit" variant="bgSuccess" value="Cadastrar" />
        </div>
      </form>
    </div>
  );
};

export { StudentEdit };
