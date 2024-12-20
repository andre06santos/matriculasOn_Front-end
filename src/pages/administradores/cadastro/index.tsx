import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";

const AdministratorRegistration = () => {
  return (
    <div className="flex-column-gap20">
      <h1>Cadastrar administrador</h1>
      <form className="form">
        <div className="input-group">
          <Input label="CPF" type="text" />
          <Input label="Cargo" type="text" />
          <Input label="Nome" type="text" />
        </div>
        <div className="input-group">
          <Input label="Username" type="text" />
          <Input label="Email" type="text" />
          <Input label="Departamento" type="text" />
        </div>
        <div className="input-group ">
          <Input label="Senha" type="password" />
          <Input label="Confirmar senha" type="password" />
        </div>
        <div className="form-actions flex-column-gap20">
          <Input type="reset" variant="bgNeutral" value="Limpar" />
          <Button type="cancel" label="Cancelar" />
          <Input type="submit" variant="bgSuccess" value="Cadastrar" />
        </div>
      </form>
    </div>
  );
};

export { AdministratorRegistration };
