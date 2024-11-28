import {
  verifyCpf,
  verifyEmail,
  verifyLettersAndNumbers,
  verifyMatricula,
  verifyNome,
  verifyOnlyLetters,
  verifyOnlyNumbers,
  verifyPassword,
  verifyUsername,
} from "./formValidationUtils";

export const handleChangeCpf = (e: any, setErrorMessages: any, setCpf: any) => {
  const actualCpf = e.target.value;
  setCpf(actualCpf);

  if (!verifyCpf(actualCpf)) {
    if (actualCpf.length > 11) {
      setCpf(actualCpf.slice(0, 11));
      console.log("Apenas 11 caracteres");
      return;
    } else if (!verifyOnlyNumbers(actualCpf) && actualCpf !== "") {
      setCpf(actualCpf.replace(/\D/g, ""));

      console.log("Nao é permitido letras");
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        cpf: "CPF inválido",
      }));
    }
  }

  if (verifyCpf(actualCpf)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      cpf: "",
    }));
  }
};

export const handleChangeMatricula = (
  e: any,
  setErrorMessages: any,
  setMatricula: any
) => {
  const actualMatricula = e.target.value;
  setMatricula(actualMatricula);

  if (!verifyMatricula(actualMatricula)) {
    if (actualMatricula.length > 10) {
      console.log("Quantidade de caracteres maximo de 10");
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        matricula: "Quantidade de caracteres maximo de 10",
      }));
      setMatricula(actualMatricula.slice(0, 10));
    } else if (!verifyLettersAndNumbers(actualMatricula)) {
      console.log("Caractere nao permitido");
      setMatricula(actualMatricula.replace(/[^a-zA-Z0-9]+$/, ""));
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        matricula: "Caractere nao permitido",
      }));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        matricula: "Matrícula inválida",
      }));
    }
  }

  if (verifyMatricula(actualMatricula)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      matricula: "",
    }));
  }
};

export const handleChangeUsername = (
  e: any,
  setErrorMessages: any,
  setUsername: any
) => {
  const actualUsername = e.target.value;
  setUsername(actualUsername);

  if (!verifyUsername(actualUsername)) {
    if (actualUsername.length > 15) {
      console.log("Quantidade de caracteres maximo de 15");
      setUsername(actualUsername.slice(0, 15));

      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        username: "Quantidade de caracteres maximo de 15",
      }));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        username: "Username inválido",
      }));
    }
  }

  if (verifyUsername(actualUsername)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      username: "",
    }));
  }
};

export const handleChangeNome = (
  e: any,
  setErrorMessages: any,
  setNome: any
) => {
  const actualNome = e.target.value;
  setNome(actualNome);

  if (!verifyNome(actualNome)) {
    if (!verifyOnlyLetters(actualNome) && actualNome.length <= 50) {
      console.log("Apenas letras são permitidas");
      setNome(actualNome.replace(/[^a-zA-ZÀ-ÿ]+$/, ""));
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        username: "Apenas letras são permitidas",
      }));
    } else if (actualNome.length > 50) {
      console.log("Quantidade de caracteres maximo de 50");
      setNome(actualNome.slice(0, 50));

      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        username: "Quantidade de caracteres maximo de 50",
      }));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        nome: "Nome inválido",
      }));
    }
  }

  if (verifyNome(actualNome)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      username: "",
    }));
  }
};

export const handleChangeEmail = (
  e: any,
  setErrorMessages: any,
  setEmail: any
) => {
  const actualEmail = e.target.value;
  setEmail(actualEmail);

  if (!verifyEmail(actualEmail)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      email: "Email inválido",
    }));
  }

  if (verifyEmail(actualEmail)) {
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
  const actualSenha = senha;

  setSenha(senha);

  if (!verifyPassword(actualSenha)) {
    if (actualSenha.length < 8) {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        senha: "Senha precisa ter no mínimo 8 caracteres",
      }));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        senha: "Senha inválida",
      }));
    }
  }
  if (verifyPassword(actualSenha)) {
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
  const actualConfSenha = confSenha;
  setConfSenha(actualConfSenha);

  if (!verifyPassword(actualConfSenha)) {
    if (confSenha.length < 8) {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        confSenha: "Senha precisa ter no mínimo 8 caracteres",
      }));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        confSenha: "Senha inválida",
      }));
    }
  }
  if (verifyPassword(actualConfSenha)) {
  } else {
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
  } else {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      confSenha: "",
    }));
  }
};
