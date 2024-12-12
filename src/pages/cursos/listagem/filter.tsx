import { Input } from "../../../ui/input";

const Filter = ({
  onSubmit,
  name,
  handleCourseName,
  nameInput,
  onReset,
}: any) => {
  return (
    <div className="filter flex-column-gap20">
      <span>Filtro</span>
      <form className="form-filter" onSubmit={onSubmit}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e: any) => {
            handleCourseName(e.target.value);
          }}
          ref={nameInput}
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
