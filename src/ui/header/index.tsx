import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./styles.css";

const Header = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1] || "";

  return (
    <header>
      <nav className="nav-itens">
        <ul className="nav-links">
          <li>
            <Link
              to="/alunos"
              className={
                path === "alunos" ? "page-tab-highlight tab-link" : "tab-link"
              }
            >
              Alunos
            </Link>
          </li>
          <li>
            <Link
              to="/cursos"
              className={
                path === "cursos" ? "page-tab-highlight tab-link" : "tab-link"
              }
            >
              Cursos
            </Link>
          </li>
          <li>
            <Link
              to="/usuarios"
              className={
                path === "usuarios" ? "page-tab-highlight tab-link" : "tab-link"
              }
            >
              Usuários
            </Link>
          </li>
          <li>
            <Link
              to="/permissoes"
              className={
                path === "permissoes"
                  ? "page-tab-highlight tab-link"
                  : "tab-link"
              }
            >
              Permissões
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
