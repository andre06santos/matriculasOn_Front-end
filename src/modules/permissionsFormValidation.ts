import {
  verifyLettersAndUnderscore,
  verifyOnlyLetters,
  verifyPermissionDescription,
  verifyRole,
} from "./formValidationUtils";

export const handleChangeRole = (
  e: any,
  setErrorMessages: any,
  setRole: any
) => {
  const actualRole = e.target.value;
  setRole(actualRole);

  if (!verifyRole(actualRole)) {
    if (!verifyLettersAndUnderscore(actualRole)) {
      setRole(actualRole.replace(/[^A-Z_]+$/, ""));

      console.log("Apenas letras maiúsculas e underscore ( _ )");
    } else if (actualRole.length > 20) {
      console.log("Quantidade de caracteres maximo de 20");
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        role: "Quantidade de caracteres maximo de 20",
      }));
      setRole(actualRole.slice(0, 20));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        role: "Matrícula inválida",
      }));
    }
  }

  if (verifyRole(actualRole)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      role: "",
    }));
  }
};

export const handleChangeDescription = (
  e: any,
  setErrorMessages: any,
  setDescription: any
) => {
  const actualDescription = e.target.value;
  setDescription(actualDescription);

  if (!verifyPermissionDescription(actualDescription)) {
    if (!verifyOnlyLetters(actualDescription)) {
      setDescription(actualDescription.replace(/[^a-zA-ZÀ-ÿ]+$/, ""));

      console.log("Permitido apenas letras");
    } else if (actualDescription.length > 20) {
      console.log("Quantidade de caracteres maximo de 100");
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        descricao: "Quantidade de caracteres maximo de 100",
      }));
      setDescription(actualDescription.slice(0, 100));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        descricao: "Matrícula inválida",
      }));
    }
  }

  if (verifyPermissionDescription(actualDescription)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      descricao: "",
    }));
  }
};
