import { Input } from "../../../ui/input/index";
import { handleChangeDescription } from "../../../modules/permissionsFormValidation";

const PermissionsFilter = ({
  onSubmit,
  descricao,
  setDescricao,
  descricaoInput,
  onReset,
}: any) => {
  return (
    <div className="filter flex-column-gap20">
      <span>Filtro</span>
      <form action="" className="form-filter" onSubmit={onSubmit}>
        <Input
          placeholder="Descrição"
          value={descricao}
          onChange={(e: any) =>
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
