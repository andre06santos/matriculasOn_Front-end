import React from "react";

/* Tipos de events */
export type FormEventType = React.FormEvent<HTMLFormElement>;
export type MouseEventType = React.MouseEvent<HTMLButtonElement>;
export type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

/* Tipos de objetos */

export type AdminType = {
  id?: string;
  pessoa: {
    id?: string;
    cpf: string;
    cargo: string;
    nome: string;
    email: string;
    departamento: string;
    tipo: string;
  };
  senha?: string;
};

export type CursoType = {
  id?: string;
  nome: string;
};

export type CursoOption = {
  label: string;
  value?: string;
};
export type PermissionsType = {
  id?: string;
  role: string;
  descricao: string;
};

export type StatusOption = {
  label: string;
  value: string;
};

export type ErrorMessagesType = Record<string, string>[];

export type AlunoType = {
  id?: string;
  pessoa: {
    id?: string;
    tipo: string;
    cpf: string;
    nome: string;
    matricula: string | null;
    email: string;
    curso: { id?: number; nome?: string } | null;
  };
  senha?: string;
};

export type ObjectCursoType = {
  label: string;
  value: number;
};

export type AlunosSearchTermType = {
  nome: string;
  cpf: string;
  matricula: string;
};
export type UserType = {
  id: string;
  username: string;
  status: boolean;
  pessoa: {
    id?: string;
    tipo: "ALUNO" | "ADMINISTRADOR";
    nome: string;
    email: string;
    cpf: string;
    matricula?: string;
    curso?: { id?: number; nome?: string } | null;
    cargo?: string;
    departamento?: string;
  };
};

/* Tipagem de components de filtragem */
export type AlunosFilterType = {
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

export type CursosFilterType = {
  onSubmit: (e: FormEventType) => Promise<void>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  nameInput: React.MutableRefObject<HTMLInputElement | null>;
  onReset: () => void;
};

export type PermissionsFilterType = {
  onSubmit: (e: FormEventType) => Promise<void>;
  descricao: string;
  setDescricao: React.Dispatch<React.SetStateAction<string>>;
  descricaoInput: React.MutableRefObject<HTMLInputElement | null>;
  onReset: () => void;
};

export type UserFilterType = {
  onSubmit: (e: FormEventType) => Promise<void>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  status:
    | {
        label: string;
        value: string;
      }
    | undefined;
  setStatus: React.Dispatch<React.SetStateAction<StatusOption | undefined>>;
  statusOptions: { label: string; value: string }[];
  usernameInput: React.MutableRefObject<HTMLInputElement | null>;
  nameInput: React.MutableRefObject<HTMLInputElement | null>;
  statusInput: React.MutableRefObject<HTMLSelectElement | null>;
  onReset: () => void;
};
