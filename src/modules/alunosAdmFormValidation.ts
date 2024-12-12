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
  validateCpf,
  validateEmail,
  validateMatricula,
  validateNome,
  validatePassword,
  validateUsername,
  validateCargo,
  validateDepartamento,
  cleanErrorMessages,
  updateErrorMessages,
  handleChangeNoWhiteSpaceInput,
} from "./formValidationUtils";

export const handleChangeCpf = (
  cpf: any,
  setErrorMessages: any,
  setCpf: any
) => {
  handleChangeNoWhiteSpaceInput(cpf, setCpf);
  const isCpfValid = validateCpf(cpf.trim());
  const fieldKey = "cpf";
  const hasErrorToast =
    (!!cpf && cpf.length > CPF_LENGTH) || !validateOnlyNumbers(cpf);

  if (isCpfValid) {
    cleanErrorMessages(setErrorMessages, fieldKey);
  } else {
    if (hasErrorToast) {
      showErrorToastCpf(cpf, setCpf);
    } else {
      const messageObject = { cpf: "Digite o CPF corretamente" };
      updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    }
  }
};

export const handleChangeFilterCpf = (cpf: any, setCpf: any) => {
  handleChangeNoWhiteSpaceInput(cpf, setCpf);

  if (!validateCpf(cpf)) {
    showErrorToastCpf(cpf, setCpf);
  }
};

const showErrorToastCpf = (cpf: any, setCpf: any) => {
  if (!!cpf && cpf.length > CPF_LENGTH) {
    const cpfWithMaxLength = cpf.slice(0, CPF_LENGTH);
    setCpf(cpfWithMaxLength);
    console.log(`Apenas ${CPF_LENGTH} caracteres`);
  } else if (!validateOnlyNumbers(cpf) && !!cpf) {
    const cpfOnlyNumbers = cpf.slice(0, -1);
    setCpf(cpfOnlyNumbers);
    console.log("Digite apenas números");
  }
};

export const handleChangeMatricula = (
  matricula: any,
  setErrorMessages: any,
  setMatricula: any
) => {
  handleChangeNoWhiteSpaceInput(matricula, setMatricula);
  const isMatriculaValid = validateMatricula(matricula.trim());
  const fieldKey = "matricula";

  if (isMatriculaValid) {
    cleanErrorMessages(setErrorMessages, fieldKey);
  } else {
    if (!!matricula && matricula.length > MAX_MATRICULA_FIELD) {
      const matriculaWithMaxField = matricula.slice(0, MAX_MATRICULA_FIELD);
      setMatricula(matriculaWithMaxField);
      console.log(`Quantidade de caracteres maximo de ${MAX_MATRICULA_FIELD}`);
    } else if (!!matricula && !validateLettersAndNumbers(matricula)) {
      const matriculaOnlyLettersAndNumbers = matricula.slice(0, -1);
      setMatricula(matriculaOnlyLettersAndNumbers);
      console.log("Caractere nao permitido");
    } else {
      const messageObject = { matricula: "Digite a matrícula corretamente" };
      updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    }
  }
};

export const handleChangeUsername = (
  username: any,
  setErrorMessages: any,
  setUsername: any
) => {
  handleChangeNoWhiteSpaceInput(username, setUsername);
  const isUsernameValid = validateUsername(username.trim());
  const fieldKey = "username";

  if (isUsernameValid) {
    cleanErrorMessages(setErrorMessages, fieldKey);
  } else {
    if (!!username && username.length > MAX_USERNAME_FIELD) {
      const usernameWithMaxField = username.slice(0, MAX_USERNAME_FIELD);
      setUsername(usernameWithMaxField);
      console.log(`Username possui no maximo ${MAX_USERNAME_FIELD} caracteres`);
    } else {
      const messageObject = { username: "Digite o username corretamente" };
      updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    }
  }
};

export const handleChangeNome = (
  nome: any,
  setErrorMessages: any,
  setNome: any
) => {
  handleChangeNoWhiteSpaceInput(nome, setNome);
  const isNomeValid = validateNome(nome.trim());
  const fieldKey = "nome";

  if (isNomeValid) {
    cleanErrorMessages(setErrorMessages, fieldKey);
  } else {
    if (!!nome && !validateOnlyLetters(nome) && nome.length <= MAX_NOME_FIELD) {
      const nomeOnlyLetters = nome.slice(0, -1);
      setNome(nomeOnlyLetters);
      console.log("Digite apenas letras!");
    } else if (nome.length > MAX_NOME_FIELD) {
      const nomeWithMaxField = nome.slice(0, MAX_NOME_FIELD);
      setNome(nomeWithMaxField);
      console.log(`Digite apenas ${MAX_NOME_FIELD} caracteres!`);
    } else {
      const messageObject = { nome: "Digite o nome corretamente" };
      updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    }
  }
};

export const handleChangeEmail = (
  email: any,
  setErrorMessages: any,
  setEmail: any
) => {
  handleChangeNoWhiteSpaceInput(email, setEmail);
  const isEmailValid = validateEmail(email.trim());
  const fieldKey = "email";

  if (isEmailValid) {
    cleanErrorMessages(setErrorMessages, fieldKey);
  } else {
    const messageObject = { email: "Digite o email corretamente" };
    updateErrorMessages(setErrorMessages, fieldKey, messageObject);
  }
};

export const handleChangeSenha = (
  senha: any,
  setErrorMessages: any,
  setSenha: any
) => {
  setSenha(senha);
  const isSenhaValid = validatePassword(senha);
  const fieldKey = "senha";

  if (isSenhaValid) {
    cleanErrorMessages(setErrorMessages, fieldKey);
  } else {
    if (!!senha && senha.length < MIN_PASSWORD) {
      const messageObject = {
        senha: `Senha precisa ter no mínimo ${MIN_PASSWORD} caracteres`,
      };
      updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    } else {
      const messageObject = { senha: "Digite a senha corretamente" };
      updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    }
  }
};

export const handleChangeConfSenha = (
  confSenha: any,
  setErrorMessages: any,
  setConfSenha: any
) => {
  setConfSenha(confSenha);
  const isConferirSenhaValid = validatePassword(confSenha);
  const fieldKey = "conferirSenha";

  if (isConferirSenhaValid) {
    cleanErrorMessages(setErrorMessages, fieldKey);
  } else {
    if (!!confSenha && confSenha.length < MIN_PASSWORD) {
      const messageObject = {
        conferirSenha: `Confirmação de senha precisa ter no mínimo ${MIN_PASSWORD} caracteres`,
      };
      updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    } else {
      const messageObject = {
        conferirSenha: "Digite a confirmação de senha corretamente",
      };
      updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    }
  }
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

export const handleChangeCargo = (
  cargo: any,
  setErrorMessages: any,
  setCargo: any
) => {
  setCargo(cargo);
  const isCargoValid = validateCargo(cargo);
  const fieldKey = "cargo";

  if (isCargoValid) {
    cleanErrorMessages(setErrorMessages, fieldKey);
  } else {
    if (
      !!cargo &&
      !validateOnlyLetters(cargo) &&
      cargo.length <= MAX_CARGO_FIELD
    ) {
      const cargoOnlyLetters = cargo.slice(0, -1);
      setCargo(cargoOnlyLetters);
      console.log("Digite apenas letras");
    } else if (cargo.length > MAX_CARGO_FIELD) {
      const cargoWithMaxLength = cargo.slice(0, MAX_CARGO_FIELD);
      setCargo(cargoWithMaxLength);
      console.log(`Quantidade de caracteres maximo de ${MAX_CARGO_FIELD}`);
    } else {
      const messageObject = { cargo: "Digite o cargo corretamente" };
      updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    }
  }
};

export const handleChangeDepartamento = (
  departamento: any,
  setErrorMessages: any,
  setDepartamento: any
) => {
  setDepartamento(departamento);
  const isDepartamentoValid = validateDepartamento(departamento);
  const fieldKey = "departamento";

  if (isDepartamentoValid) {
    cleanErrorMessages(setErrorMessages, fieldKey);
  } else {
    if (
      !!departamento &&
      !validateOnlyLetters(departamento) &&
      departamento.length <= MAX_DEPARTAMENTO_FIELD
    ) {
      const deptoOnlyLetters = departamento.slice(0, -1);
      setDepartamento(deptoOnlyLetters);
      console.log("Apenas letras são permitidas");
    } else if (departamento.length > MAX_DEPARTAMENTO_FIELD) {
      const deptoWithMaxLength = departamento.slice(0, MAX_DEPARTAMENTO_FIELD);
      setDepartamento(deptoWithMaxLength);
      console.log(
        `Quantidade de caracteres maximo de ${MAX_DEPARTAMENTO_FIELD}`
      );
    } else {
      const messageObject = {
        departamento: "Digite o departamento corretamente",
      };
      updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    }
  }
};

export const handleChangeFilterMatricula = (
  matricula: any,
  setMatricula: any
) => {
  handleChangeNoWhiteSpaceInput(matricula, setMatricula);

  if (!!matricula && matricula.length > MAX_MATRICULA_FIELD) {
    const matriculaWithMaxField = matricula.slice(0, MAX_MATRICULA_FIELD);
    setMatricula(matriculaWithMaxField);
    console.log(`Quantidade de caracteres maximo de ${MAX_MATRICULA_FIELD}`);
  } else if (!!matricula && !validateLettersAndNumbers(matricula)) {
    const matriculaOnlyLettersAndNumbers = matricula.slice(0, -1);
    setMatricula(matriculaOnlyLettersAndNumbers);
    console.log("Caractere nao permitido");
  }
};

export const handleChangeFilterNome = (nome: any, setNome: any) => {
  handleChangeNoWhiteSpaceInput(nome, setNome);

  if (!!nome && !validateOnlyLetters(nome) && nome.length <= MAX_NOME_FIELD) {
    const nomeOnlyLetters = nome.slice(0, -1);
    setNome(nomeOnlyLetters);
    console.log("Digite apenas letras!");
  } else if (nome.length > MAX_NOME_FIELD) {
    const nomeWithMaxField = nome.slice(0, MAX_NOME_FIELD);
    setNome(nomeWithMaxField);
    console.log(`Digite apenas ${MAX_NOME_FIELD} caracteres!`);
  }
};

export const handleChangeFilterUsername = (username: any, setUsername: any) => {
  handleChangeNoWhiteSpaceInput(username, setUsername);

  if (!!username && username.length > MAX_USERNAME_FIELD) {
    const usernameWithMaxField = username.slice(0, MAX_USERNAME_FIELD);
    setUsername(usernameWithMaxField);
    console.log(`Username possui no maximo ${MAX_USERNAME_FIELD} caracteres`);
  }
};
