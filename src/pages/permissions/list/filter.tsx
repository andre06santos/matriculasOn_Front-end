import { Input } from "../../../ui/input/index";
import { handleChangeDescription } from "../../../modules/permissionsFormValidation";
import {
  ChangeEventType,
  PermissionsFilterType,
} from "../../../modules/administradores/infrastructure/types";

const PermissionsFilter = ({
  onSubmit,
  descricao,
  setDescricao,
  descricaoInput,
  onReset,
}: PermissionsFilterType) => {
  return (
    <div className="filter flex-column-gap20">
      <span>Filtro</span>
      <form action="" className="form-filter" onSubmit={onSubmit}>
        <Input
          placeholder="Descrição"
          value={descricao}
          onChange={(e: ChangeEventType) =>
            handleChangeDescription(e.target.value, setDescricao)
          }
          ref={descricaoInput}
        />

        <div className="filter-buttons">
          <Input type="submit" variant="bgInfo" value="Buscar" />
          <Input
            type="reset"
            variant="bgNeutral"
            value="Limpar"
            onClick={onReset}
          />
        </div>
      </form>
    </div>
  );
};

export { PermissionsFilter };
