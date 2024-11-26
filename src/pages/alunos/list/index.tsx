import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import "./styles.css";

const ListStudents = () => {
  const students = [
    {
      matricula: "2568574MJGHF",
      cpf: "123.456.789-00",
      nome: "Maria da Silva Costa",
      email: "maria.silva@live.com",
      curso: "Engenharia Civil",
    },
    {
      matricula: "2568574MJGHF",
      cpf: "123.456.789-00",
      nome: "Maria da Silva Costa",
      email: "maria.silva@live.com",
      curso: "Engenharia Civil",
    },
    {
      matricula: "2568574MJGHF",
      cpf: "123.456.789-00",
      nome: "Maria da Silva Costa",
      email: "maria.silva@live.com",
      curso: "Engenharia Civil",
    },
  ];

  return (
    <div className="flex-column-gap20">
      <div className="add-button">
        <Link to="/alunos/novo-aluno">
          <Button type="success" label="Adicionar" />
        </Link>
      </div>
      <h1>Alunos</h1>

      <div className="filter flex-column-gap20">
        <span>Filtros</span>
        <form action="" className="form-filter">
          <Input placeholder="Matrícula" />
          <Input placeholder="CPF" />
          <Input placeholder="Nome" />

          <div className="filter__buttons">
            <Input type="submit" variant="bgInfo" value="Buscar" />
            <Input type="reset" variant="bgNeutral" value="Limpar" />
          </div>
        </form>
      </div>

      <p>
        Total de alunos encontradas:{" "}
        <span className="permissions-quantity">3</span>
      </p>

      <table className="table">
        <thead className="table__header">
          <tr>
            <th>Matricula</th>
            <th>CPF</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Curso</th>
            <th className="table-actions action-column">Ações</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index): any => (
            <tr key={index}>
              <td>{student.matricula}</td>
              <td>{student.cpf}</td>
              <td>{student.nome}</td>
              <td>{student.email}</td>
              <td>{student.curso}</td>
              <td className="table-actions action-column">
                <Link to="/permissoes/editar-permissao">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <i className="fa-solid fa-trash-can"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { ListStudents };
