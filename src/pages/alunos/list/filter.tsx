import { useState } from "react";
import {
  handleChangeCpf,
  handleChangeMatricula,
  handleChangeNome,
} from "../../../modules/alunosAdmFormValidation";
import { Input } from "../../../ui/input";

const Filter = ({
  onSubmit,
  name,
  setName,
  matricula,
  setMatricula,
  cpf,
  setCpf,
  nameInput,
  matriculaInput,
  cpfInput,
  onReset,
}: any) => {
  const [errorMessages, setErrorMessages] = useState([]);

  return (
    <div className="filter flex-column-gap20">
      <span>Filtro</span>
      <form className="form-filter" onSubmit={onSubmit}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e: any) => {
            handleChangeNome(e.target.value, setName);
          }}
          ref={nameInput}
        />
        <Input
          placeholder="Matricula"
          value={matricula}
          onChange={(e: any) => {
            handleChangeMatricula(e.target.value, setMatricula);
          }}
          ref={matriculaInput}
        />
        <Input
          placeholder="CPF"
          type="text"
          value={cpf}
          onChange={(e: any) => {
            handleChangeCpf(e.target.value, setErrorMessages, setCpf);
          }}
          ref={cpfInput}
        />

        <div className="filter-buttons">
          <Input type="submit" value="Buscar" variant="bgInfo" />
          <Input
            type="reset"
            value="Limpar"
            variant="bgNeutral"
            onClick={onReset}
          />
        </div>
      </form>
    </div>
  );
};

export { Filter };
