import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import "./styles.css";

const ListCourses = () => {
    const courses = [
        {
            name: "Engenharia Civil",
        },
        {
            name: "Análise e Desenvolvimento de Sistemas",
        },
        {
            name: "Arquitetura"
        }
    ];

    return (
        <div className="flex-column-gap20">
            <div className="add-button">
                <Link to="/cursos/novo-curso">
                    <Button type="success" label="Adicionar" />
                </Link>
            </div>
            <h1>Cursos</h1>
            <div className="filter flex-column-gap20">
                <span>Filtros</span>
                <form action="" className="form-filter">
                    <Input placeholder="Nome" />

                    <div className="filter-buttons">
                        <Input type="submit" value="Buscar" variant="bgInfo" />
                        <Input type="reset" value="Limpar" variant="bgNeutral" />
                    </div>
                </form>
            </div >
            <p>
                Total de cursos encontrados:{""}
                <span className="courses-quantity">3</span>
            </p>

            <table className="table">
                <thead className="table-header">
                    <tr>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index): any => (
                        <tr key={index}>
                            <td>{course.name}</td>
                            <td className="table-actions">
                                <Link to="/cursos/editar-curso">
                                    <i className="fa-solid fa-pen-to-square icons-action"></i>
                                </Link>
                                <i className="fa-solid fa-trash-can"></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export { ListCourses };
