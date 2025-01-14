import { useState } from "react";
import {
  handleChangeCpf,
  handleChangeMatricula,
  handleChangeNome,
} from "../../../modules/alunosAdmFormValidation";
import { Input } from "../../../ui/input";
import {
  alunosFilterType,
  ChangeEventType,
  errorMessagesType,
} from "../../../modules/administradores/infrastructure/types";

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
}: alunosFilterType) => {
  const [errorMessages, setErrorMessages] = useState<errorMessagesType>([]);

  return (
    <div className="filter flex-column-gap20">
      <span>Filtros</span>
      <form className="form-filter" onSubmit={onSubmit}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e: ChangeEventType) => {
            handleChangeNome(e.target.value, setName);
          }}
          ref={nameInput}
        />
        <Input
          placeholder="Matricula"
          value={matricula}
          onChange={(e: ChangeEventType) => {
            handleChangeMatricula(e.target.value, setMatricula);
          }}
          ref={matriculaInput}
        />
        <Input
          placeholder="CPF"
          type="text"
          value={cpf}
          onChange={(e: ChangeEventType) => {
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
