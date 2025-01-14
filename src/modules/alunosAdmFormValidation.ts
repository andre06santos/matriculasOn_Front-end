import { toast } from "react-toastify";
import {
  MAX_MATRICULA_FIELD,
  MAX_USERNAME_FIELD,
  MIN_PASSWORD,
  MAX_NOME_FIELD,
  MAX_CARGO_FIELD,
  MAX_DEPARTAMENTO_FIELD,
  CPF_LENGTH,
  validateLettersAndNumbers,
  validateOnlyLetters,
  validateOnlyNumbers,
  validateEmail,
  cleanErrorMessages,
  updateErrorMessages,
} from "./formValidationUtils";
import { errorMessagesType } from "./administradores/infrastructure/types";
import { SetStateAction } from "react";

export const cpfMask = (cpf: string) => {
  const cpfNumber = cpf.replace(/\D/g, "");
  const cpfWithMask = cpfNumber
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

  return cpfWithMask;
};

export const handleChangeCpf = (
  cpf: string,
  setErrorMessages: React.Dispatch<SetStateAction<errorMessagesType>>,
  setCpf: React.Dispatch<SetStateAction<string>>
) => {
  const fieldKey = "cpf";
  const formattedCpf = cpfMask(cpf);
  const cleanedCpf = cpf.replace(/\D/g, "");
  const hasError =
    !validateOnlyNumbers(cleanedCpf) || cleanedCpf.length > CPF_LENGTH;

  if (cpf === "") {
    setCpf(cpf);
    return;
  }

  if (hasError) {
    showCpfError(cleanedCpf);
    return;
  }

  setCpf(formattedCpf);

  if (cleanedCpf.length < CPF_LENGTH) {
    const messageObject = { cpf: "Digite o CPF corretamente" };
    updateErrorMessages(setErrorMessages, fieldKey, messageObject);
  }

  if (cleanedCpf.length === CPF_LENGTH) {
    cleanErrorMessages(setErrorMessages, fieldKey);
  }
};

export const handleChangeFilterCpf = (
  cpf: string,
  setCpf: React.Dispatch<SetStateAction<string>>
) => {
  const hasError = !validateOnlyNumbers(cpf);

  if (cpf === "") {
    setCpf(cpf);
    return;
  }

  if (hasError) {
    showCpfError(cpf);
    return;
  }

  setCpf(cpf);
};

const showCpfError = (cpf: string) => {
  const isNumber = validateOnlyNumbers(cpf);

  if (!isNumber) {
    toast("Digite apenas números!", {
      position: "top-center",
      type: "error",
    });
    return;
  }
};

export const handleChangeMatricula = (
  matricula: string,
  setMatricula: React.Dispatch<SetStateAction<string>>
) => {
  const hasError =
    !validateLettersAndNumbers(matricula) ||
    matricula.length > MAX_MATRICULA_FIELD;

  if (matricula === "") {
    setMatricula(matricula);
    return;
  }

  if (hasError) {
    showMatriculaError(matricula);
    return;
  }

  setMatricula(matricula);
};

const showMatriculaError = (matricula: string) => {
  const hasLettersAndNumbers = validateLettersAndNumbers(matricula);

  if (!hasLettersAndNumbers) {
    toast("Caractere nao permitido!", {
      position: "top-center",
      type: "error",
    });
    return;
  }

  if (matricula.length > MAX_MATRICULA_FIELD) {
    toast(`Quantidade de caracteres maximo de ${MAX_MATRICULA_FIELD}`, {
      position: "top-center",
      type: "error",
    });
    return;
  }
};

export const handleChangeNome = (
  nome: string,
  setNome: React.Dispatch<SetStateAction<string>>
) => {
  const hasError = !validateOnlyLetters(nome) || nome.length > MAX_NOME_FIELD;
  const trimmedNome = nome.trim();

  if (trimmedNome === "") {
    setNome(trimmedNome);
    return;
  }

  if (hasError) {
    showNomeError(nome);
    return;
  }

  setNome(nome);
};

const showNomeError = (nome: string) => {
  const hasOnlyLetters = validateOnlyLetters(nome);

  if (!hasOnlyLetters) {
    toast("Caractere nao permitido!", {
      position: "top-center",
      type: "error",
    });
    return;
  }

  if (nome.length > MAX_NOME_FIELD) {
    toast(`Quantidade de caracteres maximo de ${MAX_NOME_FIELD}`, {
      position: "top-center",
      type: "error",
    });
    return;
  }
};

export const handleChangeUsername = (
  username: string,
  setUsername: React.Dispatch<SetStateAction<string>>
) => {
  const trimmedUsername = username.trim();

  if (trimmedUsername === "") {
    setUsername(trimmedUsername);
    return;
  }

  if (trimmedUsername.length > MAX_USERNAME_FIELD) {
    toast(`Quantidade de caracteres maximo de ${MAX_USERNAME_FIELD}`, {
      position: "top-center",
      type: "error",
    });
    return;
  }

  setUsername(trimmedUsername);
};

export const handleChangeEmail = (
  email: string,
  setErrorMessages: React.Dispatch<SetStateAction<errorMessagesType>>,
  setEmail: React.Dispatch<SetStateAction<string>>
) => {
  const fieldKey = "email";
  const hasError = !validateEmail(email);

  const trimmedEmail = email.trim();

  if (trimmedEmail === "") {
    setEmail(trimmedEmail);
    return;
  }

  setEmail(trimmedEmail);

  if (hasError) {
    const messageObject = { email: "Digite o email corretamente" };
    updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    return;
  } else {
    cleanErrorMessages(setErrorMessages, fieldKey);
  }
};

export const handleChangeSenha = (
  senha: string,
  setErrorMessages: React.Dispatch<SetStateAction<errorMessagesType>>,
  setSenha: React.Dispatch<SetStateAction<string>>
) => {
  const fieldKey = "senha";

  if (senha === "") {
    setSenha(senha);
    return;
  }

  if (senha.length < MIN_PASSWORD) {
    const messageObject = {
      senha: `Senha precisa ter no mínimo ${MIN_PASSWORD} caracteres`,
    };
    updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    setSenha(senha);
    return;
  }

  cleanErrorMessages(setErrorMessages, fieldKey);
  setSenha(senha);
};

export const handleChangeConfSenha = (
  confSenha: string,
  setErrorMessages: React.Dispatch<SetStateAction<errorMessagesType>>,
  setConfSenha: React.Dispatch<SetStateAction<string>>
) => {
  const fieldKey = "confSenha";

  if (confSenha === "") {
    setConfSenha(confSenha);
    return;
  }

  if (confSenha.length < MIN_PASSWORD) {
    const messageObject = {
      conferirSenha: `Confirmação de senha precisa ter no mínimo ${MIN_PASSWORD} caracteres`,
    };
    updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    setConfSenha(confSenha);
    return;
  }

  cleanErrorMessages(setErrorMessages, fieldKey);
  setConfSenha(confSenha);
};

export const verificaSenhasIguais = (
  senha: string,
  confSenha: string,
  setErrorMessages: React.Dispatch<SetStateAction<errorMessagesType>>
) => {
  const fieldKey = "conferirSenha";

  if (senha !== confSenha) {
    const messageObject = { conferirSenha: "Senhas não coincidem" };
    updateErrorMessages(setErrorMessages, fieldKey, messageObject);
  } else {
    cleanErrorMessages(setErrorMessages, fieldKey);
  }
};

export const handleChangeCargo = (
  cargo: string,
  setCargo: React.Dispatch<SetStateAction<string>>
) => {
  const hasOnlyLetters = validateOnlyLetters(cargo);

  if (cargo === "") {
    setCargo(cargo);
    return;
  }

  if (!hasOnlyLetters) {
    toast("Digite apenas letras", {
      position: "top-center",
      type: "error",
    });
    return;
  }

  if (cargo.length > MAX_CARGO_FIELD) {
    toast(`Quantidade de caracteres maximo de ${MAX_CARGO_FIELD}`, {
      position: "top-center",
      type: "error",
    });
    return;
  }

  setCargo(cargo);
};

export const handleChangeDepartamento = (
  departamento: string,
  setDepartamento: React.Dispatch<SetStateAction<string>>
) => {
  const hasOnlyLetters = validateOnlyLetters(departamento);

  if (departamento === "") {
    setDepartamento(departamento);
    return;
  }

  if (!hasOnlyLetters) {
    toast("Digite apenas letras!", {
      position: "top-center",
      type: "error",
    });
    return;
  }

  if (departamento.length > MAX_DEPARTAMENTO_FIELD) {
    toast(`Quantidade de caracteres maximo de ${MAX_DEPARTAMENTO_FIELD}`, {
      position: "top-center",
      type: "error",
    });
    return;
  }

  setDepartamento(departamento);
};
