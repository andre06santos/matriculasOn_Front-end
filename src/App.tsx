import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./ui/layout";
import { ListPermissions } from "./pages/permissions/list";
import { CreatePermission } from "./pages/permissions/create";
import { EditPermission } from "./pages/permissions/edit";
import { CourseRegistration } from "./pages/cursos/cadastro";
import { EditCourse } from "./pages/cursos/edicao";

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

          <Route path="/cursos" element={<ListPermissions />} />
          <Route path="/cursos/novo-curso" element={<CourseRegistration />} />
          <Route path="/cursos/editar-curso" element={<EditCourse />} />

          <Route path="/alunos" element={<ListPermissions />} />
          <Route path="/alunos/novo-aluno" element={<CourseRegistration />} />
          <Route path="/alunos/editar-aluno" element={<EditCourse />} />

          <Route path="/usuarios" element={<ListPermissions />} />
          <Route
            path="/usuarios/novo-usuario"
            element={<CourseRegistration />}
          />
          <Route path="/usuarios/editar-usuario" element={<EditCourse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
