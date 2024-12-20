import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";

const EditCourse = () => {
  return (
    <div className="flex-column-gap20">
      <h1>Editar curso</h1>
      <form className="form flex-column-gap20">
        <div className="flex-column-gap20">
          <Input label="Nome" type="text" />
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

export { EditCourse };
