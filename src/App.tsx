import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./ui/layout";
import { ListPermissions } from "./pages/permissao/list";
import { CreatePermission } from "./pages/permissao/cadastro";
import { EditPermission } from "./pages/permissao/edicao";
import { CourseRegistration } from "./pages/cursos/cadastro";
import { EditCourse } from "./pages/cursos/edicao";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/permissoes" element={<ListPermissions />} />
            <Route path="/nova-permissao" element={<CreatePermission />} />
            <Route path="/editar-permissao" element={<EditPermission />} />

            <Route path="/cursos" element={<ListPermissions />} />
            <Route path="/novo-curso" element={<CourseRegistration />} />
            <Route path="/editar-curso" element={<EditCourse />} />

            <Route path="/alunos" element={<ListPermissions />} />
            <Route path="/novo-aluno" element={<CourseRegistration />} />
            <Route path="/editar-aluno" element={<EditCourse />} />

            <Route path="/usuarios" element={<ListPermissions />} />
            <Route path="/novo-usuario" element={<CourseRegistration />} />
            <Route path="/editar-usuario" element={<EditCourse />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
