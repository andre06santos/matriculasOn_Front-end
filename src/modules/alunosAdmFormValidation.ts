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

export const handleChangeCpf = (
  cpf: any,
  setErrorMessages: any,
  setCpf: any
) => {
  const fieldKey = "cpf";
  const hasError = !validateOnlyNumbers(cpf) || cpf.length > CPF_LENGTH;

  if (cpf === "") {
    setCpf(cpf);
    return;
  }

  if (hasError) {
    showCpfError(cpf);
    return;
  }

  setCpf(cpf);

  if (cpf.length < CPF_LENGTH) {
    const messageObject = { cpf: "Digite o CPF corretamente" };
    updateErrorMessages(setErrorMessages, fieldKey, messageObject);
  }

  if (cpf.length === CPF_LENGTH) {
    cleanErrorMessages(setErrorMessages, fieldKey);
  }
};

export const handleChangeFilterCpf = (cpf: any, setCpf: any) => {
  const hasError = !validateOnlyNumbers(cpf) || cpf.length > CPF_LENGTH;

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

const showCpfError = (cpf: any) => {
  const isNumber = validateOnlyNumbers(cpf);

  if (!isNumber) {
    console.log("Digite apenas números!");
    return;
  }

  if (cpf.length > CPF_LENGTH) {
    console.log(`Digite apenas ${CPF_LENGTH} caracteres!`);
    return;
  }
};

export const handleChangeMatricula = (matricula: any, setMatricula: any) => {
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

const showMatriculaError = (matricula: any) => {
  const hasLettersAndNumbers = validateLettersAndNumbers(matricula);

  if (!hasLettersAndNumbers) {
    console.log("Caractere nao permitido");
    return;
  }

  if (matricula.length > MAX_MATRICULA_FIELD) {
    console.log(`Quantidade de caracteres maximo de ${MAX_MATRICULA_FIELD}`);
    return;
  }
};

export const handleChangeNome = (nome: any, setNome: any) => {
  const hasError = !validateOnlyLetters(nome) || nome.length > MAX_NOME_FIELD;

  if (nome === "") {
    setNome(nome);
    return;
  }

  if (hasError) {
    showNomeError(nome);
    return;
  }

  setNome(nome);
};

const showNomeError = (nome: any) => {
  const hasOnlyLetters = validateOnlyLetters(nome);

  if (!hasOnlyLetters) {
    console.log("Caractere nao permitido");
    return;
  }

  if (nome.length > MAX_NOME_FIELD) {
    console.log(`Quantidade de caracteres maximo de ${MAX_NOME_FIELD}`);
    return;
  }
};

export const handleChangeUsername = (username: any, setUsername: any) => {
  if (username === "") {
    setUsername(username);
    return;
  }

  if (username.length > MAX_USERNAME_FIELD) {
    console.log(`Quantidade de caracteres maximo de ${MAX_USERNAME_FIELD}`);
    return;
  }

  setUsername(username);
};

export const handleChangeEmail = (
  email: any,
  setErrorMessages: any,
  setEmail: any
) => {
  const fieldKey = "email";
  const hasError = !validateEmail(email);

  if (email === "") {
    setEmail(email);
    return;
  }

  setEmail(email);

  if (hasError) {
    const messageObject = { email: "Digite o email corretamente" };
    updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    return;
  } else {
    cleanErrorMessages(setErrorMessages, fieldKey);
  }
};

export const handleChangeSenha = (
  senha: any,
  setErrorMessages: any,
  setSenha: any
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
  confSenha: any,
  setErrorMessages: any,
  setConfSenha: any
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
  senha: any,
  confSenha: any,
  setErrorMessages: any
) => {
  const fieldKey = "conferirSenha";

  if (senha !== confSenha) {
    const messageObject = { conferirSenha: "Senhas não coincidem" };
    updateErrorMessages(setErrorMessages, fieldKey, messageObject);
  } else {
    cleanErrorMessages(setErrorMessages, fieldKey);
  }
};

export const handleChangeCargo = (cargo: any, setCargo: any) => {
  const hasOnlyLetters = validateOnlyLetters(cargo);

  if (cargo === "") {
    setCargo(cargo);
    return;
  }

  if (!hasOnlyLetters) {
    console.log("Digite apenas letras");
    return;
  }

  if (cargo.length > MAX_CARGO_FIELD) {
    console.log(`Quantidade de caracteres maximo de ${MAX_CARGO_FIELD}`);
    return;
  }

  setCargo(cargo);
};

export const handleChangeDepartamento = (
  departamento: any,
  setDepartamento: any
) => {
  const hasOnlyLetters = validateOnlyLetters(departamento);

  if (departamento === "") {
    setDepartamento(departamento);
    return;
  }

  if (!hasOnlyLetters) {
    console.log("Digite apenas letras");
    return;
  }

  if (departamento.length > MAX_DEPARTAMENTO_FIELD) {
    console.log(`Quantidade de caracteres maximo de ${MAX_DEPARTAMENTO_FIELD}`);
    return;
  }

  setDepartamento(departamento);
};
