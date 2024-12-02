import {
  MAX_MATRICULA_FIELD,
  MAX_USERNAME_FIELD,
  MIN_PASSWORD,
  validateCpf,
  validateEmail,
  validateLettersAndNumbers,
  validateMatricula,
  validateNome,
  validateOnlyLetters,
  validateOnlyNumbers,
  validatePassword,
  validateUsername,
  MAX_NOME_FIELD,
  MAX_CARGO_FIELD,
  MAX_DEPARTAMENTO_FIELD,
  validateCargo,
  validateDepartamento,
  CPF_LENGTH,
} from "./formValidationUtils";

export const handleChangeCpf = (
  cpf: any,
  setErrorMessages: any,
  setCpf: any
) => {
  setCpf(cpf);
  const isCpfValid = validateCpf(cpf);

  if (isCpfValid) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      cpf: "",
    }));
  } else {
    if (cpf.length > CPF_LENGTH) {
      const cpfWithMaxLength = cpf.slice(0, CPF_LENGTH);
      setCpf(cpfWithMaxLength);
      console.log(`Apenas ${CPF_LENGTH} caracteres`);
      return;
    } else if (!validateOnlyNumbers(cpf) && cpf !== "") {
      const cpfOnlyNumbers = cpf.replace(/\D/g, "");
      setCpf(cpfOnlyNumbers);
      console.log("Digite apenas números");
      return;
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        cpf: "CPF inválido",
      }));
    }
  }
};

export const handleChangeMatricula = (
  matricula: any,
  setErrorMessages: any,
  setMatricula: any
) => {
  setMatricula(matricula);
  const isMatriculaValid = validateMatricula(matricula);

  if (isMatriculaValid) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      matricula: "",
    }));
    return;
  } else {
    if (matricula.length > MAX_MATRICULA_FIELD) {
      const matriculaWithMaxField = matricula.slice(0, MAX_MATRICULA_FIELD);
      setMatricula(matriculaWithMaxField);
      console.log(`Quantidade de caracteres maximo de ${MAX_MATRICULA_FIELD}`);
      return;
    } else if (!validateLettersAndNumbers(matricula)) {
      const matriculaOnlyLettersAndNumbers = matricula.replace(
        /[^a-zA-Z0-9]+$/,
        ""
      );
      setMatricula(matriculaOnlyLettersAndNumbers);
      console.log("Caractere nao permitido");
      return;
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        matricula: "Matrícula inválida",
      }));
      return;
    }
  }
};

export const handleChangeUsername = (
  username: any,
  setErrorMessages: any,
  setUsername: any
) => {
  setUsername(username);
  const isUsernameValid = validateUsername(username);

  if (isUsernameValid) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      username: "",
    }));
    return;
  } else {
    if (username.length > MAX_USERNAME_FIELD) {
      const usernameWithMaxField = username.slice(0, MAX_USERNAME_FIELD);
      setUsername(usernameWithMaxField);
      console.log(`Quantidade de caracteres maximo de ${MAX_USERNAME_FIELD}`);
      return;
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        username: "Username inválido",
      }));
      return;
    }
  }
};

export const handleChangeNome = (
  nome: any,
  setErrorMessages: any,
  setNome: any
) => {
  setNome(nome);
  const isNomeValid = validateNome(nome);

  if (isNomeValid) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      nome: "",
    }));
    return;
  } else {
    if (!validateOnlyLetters(nome) && nome.length <= MAX_NOME_FIELD) {
      const nomeOnlyLetters = nome.replace(/[^a-zA-ZÀ-ÿ]+$/, "");
      setNome(nomeOnlyLetters);
      console.log("Apenas letras são permitidas");
      return;
    } else if (nome.length > MAX_NOME_FIELD) {
      const nomeWithMaxField = nome.slice(0, MAX_NOME_FIELD);
      setNome(nomeWithMaxField);
      console.log(`Quantidade de caracteres maximo de ${MAX_NOME_FIELD}`);
      return;
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        nome: "Nome inválido",
      }));
      return;
    }
  }
};

export const handleChangeEmail = (
  email: any,
  setErrorMessages: any,
  setEmail: any
) => {
  setEmail(email);
  const isEmailValid = validateEmail(email);

  if (isEmailValid) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      email: "",
    }));
    return;
  } else {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      email: "Email inválido",
    }));
    return;
  }
};

export const handleChangeSenha = (
  senha: any,
  setErrorMessages: any,
  setSenha: any
) => {
  setSenha(senha);
  const isSenhaValid = validatePassword(senha);

  if (isSenhaValid) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      senha: "",
    }));
    return;
  } else {
    if (senha.length < MIN_PASSWORD) {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        senha: `Senha precisa ter no mínimo ${MIN_PASSWORD} caracteres`,
      }));
      return;
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        senha: "Senha inválida",
      }));
      return;
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

  if (isConferirSenhaValid) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      confSenha: "",
    }));
    return;
  } else {
    if (confSenha.length < MIN_PASSWORD) {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        confSenha: `Senha precisa ter no mínimo ${MIN_PASSWORD} caracteres`,
      }));
      return;
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        confSenha: "Senha inválida",
      }));
      return;
    }
  }
};

export const verificaSenhasIguais = (
  senha: any,
  confSenha: any,
  setErrorMessages: any
) => {
  if (senha !== confSenha) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      confSenha: "Senhas não coincidem",
    }));
    return;
  } else {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      confSenha: "",
    }));
  }
};

export const handleChangeCargo = (
  cargo: any,
  setErrorMessages: any,
  setCargo: any
) => {
  setCargo(cargo);
  const isCargoValid = validateCargo(cargo);

  if (isCargoValid) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      cargo: "",
    }));
    return;
  } else {
    if (!validateOnlyLetters(cargo) && cargo.length <= MAX_CARGO_FIELD) {
      const cargoOnlyLetters = cargo.replace(/[^a-zA-ZÀ-ÿ´`~^]+$/, "");
      setCargo(cargoOnlyLetters);
      console.log("Apenas letras são permitidas");
      return;
    } else if (cargo.length > MAX_CARGO_FIELD) {
      const cargoWithMaxLength = cargo.slice(0, MAX_CARGO_FIELD);
      setCargo(cargoWithMaxLength);
      console.log(`Quantidade de caracteres maximo de ${MAX_CARGO_FIELD}`);
      return;
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        cargo: "Nome inválido",
      }));
      return;
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

  if (isDepartamentoValid) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      departamento: "",
    }));
    return;
  } else {
    if (
      !validateOnlyLetters(departamento) &&
      departamento.length <= MAX_DEPARTAMENTO_FIELD
    ) {
      const deptoOnlyLetters = departamento.replace(/[^a-zA-ZÀ-ÿ´`~^]+$/, "");
      setDepartamento(deptoOnlyLetters);
      console.log("Apenas letras são permitidas");
      return;
    } else if (departamento.length > MAX_DEPARTAMENTO_FIELD) {
      const deptoWithMaxLength = departamento.slice(0, MAX_DEPARTAMENTO_FIELD);
      setDepartamento(deptoWithMaxLength);
      console.log(
        `Quantidade de caracteres maximo de ${MAX_DEPARTAMENTO_FIELD}`
      );
      return;
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        departamento: "Nome inválido",
      }));
      return;
    }
  }
};
