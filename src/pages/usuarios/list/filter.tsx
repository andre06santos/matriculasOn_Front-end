import { useEffect } from "react";
import {
  handleChangeNome,
  handleChangeUsername,
} from "../../../modules/alunosAdmFormValidation";

import { Input } from "../../../ui/input";

const Filter = ({
  onSubmit,
  username,
  setUsername,
  usernameInput,
  name,
  setName,
  nameInput,
  status,
  setStatus,
  statusOptions,
  statusInput,
  onReset,
}: any) => {
  return (
    <div className="filter flex-column-gap20">
      <span>Filtro</span>
      <form className="form-filter" onSubmit={onSubmit}>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e: any) => {
            handleChangeUsername(e.target.value, setUsername);
          }}
          ref={usernameInput}
        />
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e: any) => {
            handleChangeNome(e.target.value, setName);
          }}
          ref={nameInput}
        />
        <Input
          selectOptions={statusOptions}
          ref={statusInput}
          value={status}
          onChange={setStatus}
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
