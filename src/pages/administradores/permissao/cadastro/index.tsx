import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import "./styles.css";

const CadastroPermissao = () => {
  return (
    <div className="add-page flex-column-gap20">
      <h1>Cadastrar permissão</h1>

      <form action="" className="form flex-column-gap20">
        <div className="form__inputs flex-column-gap20">
          <Input label="Role" />
          <Input label="Descrição" />
        </div>

        <div className="form__buttons">
          <Input type="reset" value="Limpar" />
          <Button label="Cancelar" />
          <Button label="Cadastrar" type="success" />
        </div>
      </form>
    </div>
  );
};

export { CadastroPermissao };
