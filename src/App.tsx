import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./ui/layout";
import { ListPermissions } from "./pages/permissions/list";
import { ListCourses } from "./pages/cursos/listagem";
import { CreatePermission } from "./pages/permissions/create";
import { EditPermission } from "./pages/permissions/edit";
import { CourseRegistration } from "./pages/cursos/cadastro";
import { EditCourse } from "./pages/cursos/edicao";
import { ListStudents } from "./pages/alunos/list";
import { RegisterStudent } from "./pages/alunos/cadastro";
import { EditStudent } from "./pages/alunos/edicao";
import { AdministratorRegistration } from "./pages/administradores/cadastro";
import { EditAdmin } from "./pages/administradores/edicao";
import { ListUser } from "./pages/usuarios/list";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/permissoes" element={<ListPermissions />} />
          <Route
            path="/permissoes/nova-permissao"
            element={<CreatePermission />}
          />
          <Route
            path="/permissoes/editar-permissao"
            element={<EditPermission />}
          />

          <Route path="/cursos" element={<ListCourses />} />
          <Route path="/cursos/novo-curso" element={<CourseRegistration />} />
          <Route path="/cursos/editar-curso" element={<EditCourse />} />

          <Route path="/alunos" element={<ListStudents />} />
          <Route path="/alunos/novo-aluno" element={<RegisterStudent />} />
          <Route path="/alunos/editar-aluno" element={<EditStudent />} />

          <Route
            path="/administradores/novo-administrador"
            element={<AdministratorRegistration />}
          />
          <Route
            path="/administradores/editar-administrador"
            element={<EditAdmin />}
          />

          <Route path="/usuarios" element={<ListUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
