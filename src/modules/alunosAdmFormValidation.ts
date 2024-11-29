import {
  MAX_CPF_FIELD,
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
} from "./formValidationUtils";

export const handleChangeCpf = (
  cpf: any,
  setErrorMessages: any,
  setCpf: any
) => {
  setCpf(cpf);

  if (!validateCpf(cpf)) {
    if (cpf.length > MAX_CPF_FIELD) {
      setCpf(cpf.slice(0, MAX_CPF_FIELD));
      console.log(`Apenas ${MAX_CPF_FIELD} caracteres`);
      return;
    } else if (!validateOnlyNumbers(cpf) && cpf !== "") {
      setCpf(cpf.replace(/\D/g, ""));

      console.log("Digite apenas números");
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        cpf: "CPF inválido",
      }));
    }
    return;
  }

  if (validateCpf(cpf)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      cpf: "",
    }));
  }
};

export const handleChangeMatricula = (
  matricula: any,
  setErrorMessages: any,
  setMatricula: any
) => {
  setMatricula(matricula);

  if (!validateMatricula(matricula)) {
    if (matricula.length > MAX_MATRICULA_FIELD) {
      console.log(`Quantidade de caracteres maximo de ${MAX_MATRICULA_FIELD}`);
      setMatricula(matricula.slice(0, MAX_MATRICULA_FIELD));
    } else if (!validateLettersAndNumbers(matricula)) {
      console.log("Caractere nao permitido");
      setMatricula(matricula.replace(/[^a-zA-Z0-9]+$/, ""));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        matricula: "Matrícula inválida",
      }));
    }
    return;
  }

  if (validateMatricula(matricula)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      matricula: "",
    }));
  }
};

export const handleChangeUsername = (
  username: any,
  setErrorMessages: any,
  setUsername: any
) => {
  setUsername(username);

  if (!validateUsername(username)) {
    if (username.length > MAX_USERNAME_FIELD) {
      console.log(`Quantidade de caracteres maximo de ${MAX_USERNAME_FIELD}`);
      setUsername(username.slice(0, MAX_USERNAME_FIELD));

      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        username: `Quantidade de caracteres maximo de ${MAX_USERNAME_FIELD}`,
      }));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        username: "Username inválido",
      }));
    }
    return;
  }

  if (validateUsername(username)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      username: "",
    }));
  }
};

export const handleChangeNome = (
  nome: any,
  setErrorMessages: any,
  setNome: any
) => {
  setNome(nome);

  if (!validateNome(nome)) {
    if (!validateOnlyLetters(nome) && nome.length <= MAX_NOME_FIELD) {
      console.log("Apenas letras são permitidas");
      setNome(nome.replace(/[^a-zA-ZÀ-ÿ]+$/, ""));
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        nome: "Apenas letras são permitidas",
      }));
    } else if (nome.length > MAX_NOME_FIELD) {
      console.log(`Quantidade de caracteres maximo de ${MAX_NOME_FIELD}`);
      setNome(nome.slice(0, MAX_NOME_FIELD));

      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        nome: `Quantidade de caracteres maximo de ${MAX_NOME_FIELD}`,
      }));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        nome: "Nome inválido",
      }));
    }
    return;
  }

  if (validateNome(nome)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      nome: "",
    }));
  }
};

export const handleChangeEmail = (
  email: any,
  setErrorMessages: any,
  setEmail: any
) => {
  setEmail(email);

  if (!validateEmail(email)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      email: "Email inválido",
    }));
    return;
  }

  if (validateEmail(email)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      email: "",
    }));
  }
};

export const handleChangeSenha = (
  senha: any,
  setErrorMessages: any,
  setSenha: any
) => {
  setSenha(senha);

  if (!validatePassword(senha)) {
    if (senha.length < MIN_PASSWORD) {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        senha: `Senha precisa ter no mínimo ${MIN_PASSWORD} caracteres`,
      }));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        senha: "Senha inválida",
      }));
    }
    return;
  }
  if (validatePassword(senha)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      senha: "",
    }));
  }
};
export const handleChangeConfSenha = (
  confSenha: any,
  setErrorMessages: any,
  setConfSenha: any
) => {
  setConfSenha(confSenha);

  if (!validatePassword(confSenha)) {
    if (confSenha.length < MIN_PASSWORD) {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        confSenha: `Senha precisa ter no mínimo ${MIN_PASSWORD} caracteres`,
      }));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        confSenha: "Senha inválida",
      }));
    }
    return;
  }
  if (validatePassword(confSenha)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      confSenha: "",
    }));
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

  if (!validateCargo(cargo)) {
    if (!validateOnlyLetters(cargo) && cargo.length <= MAX_CARGO_FIELD) {
      console.log("Apenas letras são permitidas");
      setCargo(cargo.replace(/[^a-zA-ZÀ-ÿ´`~^]+$/, ""));
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        cargo: "Apenas letras são permitidas",
      }));
    } else if (cargo.length > MAX_CARGO_FIELD) {
      console.log(`Quantidade de caracteres maximo de ${MAX_CARGO_FIELD}`);
      setCargo(cargo.slice(0, MAX_CARGO_FIELD));

      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        cargo: `Quantidade de caracteres maximo de ${MAX_CARGO_FIELD}`,
      }));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        cargo: "Nome inválido",
      }));
    }
    return;
  }

  if (validateCargo(cargo)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      cargo: "",
    }));
  }
};

export const handleChangeDepartamento = (
  departamento: any,
  setErrorMessages: any,
  setDepartamento: any
) => {
  setDepartamento(departamento);

  if (!validateDepartamento(departamento)) {
    if (
      !validateOnlyLetters(departamento) &&
      departamento.length <= MAX_DEPARTAMENTO_FIELD
    ) {
      console.log("Apenas letras são permitidas");
      setDepartamento(departamento.replace(/[^a-zA-ZÀ-ÿ´`~^]+$/, ""));
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        departamento: "Apenas letras são permitidas",
      }));
    } else if (departamento.length > MAX_DEPARTAMENTO_FIELD) {
      console.log(
        `Quantidade de caracteres maximo de ${MAX_DEPARTAMENTO_FIELD}`
      );
      setDepartamento(departamento.slice(0, MAX_DEPARTAMENTO_FIELD));

      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        departamento: `Quantidade de caracteres maximo de ${MAX_DEPARTAMENTO_FIELD}`,
      }));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        departamento: "Nome inválido",
      }));
    }
    return;
  }

  if (validateDepartamento(departamento)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      departamento: "",
    }));
  }
};
