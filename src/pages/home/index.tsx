import { Input } from "../../ui/input";
import "./styles.css";

const LoginPage = () => {
  return (
    <div className="login-background">
      <div className="form-container">
        <img src="logo.svg" />
        <form>
          <Input label="CPF" autoFocus />
          <Input label="Senha" type="password" />
          <Input value="Login" type="submit" />
        </form>
      </div>
    </div>
  );
};

export { LoginPage };
