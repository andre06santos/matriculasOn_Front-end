import React from "react";

/* Tipos de events */
export type FormEventType = React.FormEvent<HTMLFormElement>;
export type MouseEventType = React.MouseEvent<HTMLButtonElement>;
export type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

/* Tipos de objetos */

export type AdminType = {
  id?: string;
  cpf: string;
  cargo: string;
  nome: string;
  email: string;
  departamento: string;
};

export type CursoType = {
  id?: string;
  nome: string;
};

export type PermissionsType = {
  id?: string;
  role: string;
  descricao: string;
};

export type ErrorMessagesType = Record<string, string>[];

export type AlunoType = {
  id?: string;
  cpf: string;
  nome: string;
  username?: string;
  matricula: string;
  email: string;
  curso: string;
};

export type ObjectCursoType = {
  label: string;
  value: string;
};

export type AlunosSearchTermType = {
  nome: string;
  cpf: string;
  matricula: string;
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
