import { Link } from "react-router-dom";
import "./styles.css";

const Header = () => {
  return (
    <header>
      <nav className="nav-itens">
        <ul className="nav-links">
          <Link to="/alunos">
            <li>Alunos</li>
          </Link>
          <Link to="/cursos">
            <li>Cursos</li>
          </Link>
          <Link to="/usuarios">
            <li>Usuários</li>
          </Link>
          <Link to="/permissoes">
            <li>Permissões</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
