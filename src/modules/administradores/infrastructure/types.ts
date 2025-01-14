/* Tipos de events */
export type FormEventType = React.FormEvent<HTMLFormElement>;
export type MouseEventType = React.MouseEvent<HTMLButtonElement>;
export type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

/* Tipos de objetos */

export type cursoType = {
  id?: string;
  nome: string;
};

export type errorMessagesType = Record<string, string>[];

export type alunoType = {
  id?: string;
  cpf: string;
  nome: string;
  username?: string;
  matricula: string;
  email: string;
  curso: string;
};

export type objectCursoType = {
  label: string;
  value: string;
};

export type alunosSearchTermType = {
  nome: string;
  cpf: string;
  matricula: string;
};

/* Tipagem de components de filtragem */
export type alunosFilterType = {
  onSubmit: (e: FormEventType) => Promise<void>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  matricula: string;
  setMatricula: React.Dispatch<React.SetStateAction<string>>;
  cpf: string;
  setCpf: React.Dispatch<React.SetStateAction<string>>;
  nameInput: React.MutableRefObject<HTMLInputElement | null>;
  matriculaInput: React.MutableRefObject<HTMLInputElement | null>;
  cpfInput: React.MutableRefObject<HTMLInputElement | null>;
  onReset: () => void;
};

export type cursosFilterType = {
  onSubmit: (e: FormEventType) => Promise<void>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  nameInput: React.MutableRefObject<HTMLInputElement | null>;
  onReset: () => void;
};
