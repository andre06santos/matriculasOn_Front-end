import { Link } from "react-router-dom";
import "./styles.css";

const Header = () => {
  return (
    <header>
      <nav className="nav-itens">
        <ul className="nav-links">
          <li>
            <Link to="/alunos">Alunos</Link>
          </li>
          <li>
            <Link to="/cursos">Cursos</Link>
          </li>
          <li>
            <Link to="/usuarios">Usuários</Link>
          </li>
          <li>
            <Link to="/permissoes">Permissões</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
