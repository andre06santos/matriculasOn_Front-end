import "./styles.css";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const StudentEdit = () => {

  const { state } = useLocation();


  const selectOptions = [
    { label: "Análise e Desenvolvimento de Sistemas", value: "ADS" },
    { label: "Engenharia de Software", value: "ENG_SOF" },
    { label: "Redes de Computadores", value: "RED" },
    { label: "Tecnologia da Informação", value: "TEC_INF" },
  ];

  return (
    <div className="flex-column-gap20">
      <h1>Editar aluno</h1>
      <form className="form">
        <div className="input-group">
          <Input label="CPF" type="text" value={state.cpf} readonly={true} />
          <Input label="Matrícula" type="text" value={state.matricula} />
          <Input label="Nome" type="text" value={state.nome} />
        </div>
        <div className="input-group">
          <Input label="Username" type="text" value={state.username == null ? "" : state.username} />
          <Input label="Email" type="text" value={state.email} />
          <Input label="Curso" type="text" selectOptions={selectOptions} />
        </div>
        <div className="input-group">
          <Input label="Senha" type="password" />
          <Input label="Confirmar senha" type="password" />
        </div>
        <div className="form-actions flex-column-gap20">
          <Input type="reset" variant="bgNeutral" value="Limpar" />
          <Link to="/usuarios">
            <Button type="cancel" label="Cancelar" />
          </Link>
          <Input type="submit" variant="bgSuccess" value="Cadastrar" />
        </div>
      </form>
    </div>
  );
};

export { StudentEdit };
