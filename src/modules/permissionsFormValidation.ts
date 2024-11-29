import {
  MAX_DESCRICAO_FIELD,
  MAX_ROLE_FIELD,
  validateLettersAndUnderscore,
  validateOnlyLetters,
  validatePermissionDescription,
  validateRole,
} from "./formValidationUtils";

export const handleChangeRole = (
  role: any,
  setErrorMessages: any,
  setRole: any
) => {
  setRole(role);

  if (!validateRole(role)) {
    if (!validateLettersAndUnderscore(role)) {
      setRole(role.replace(/[^A-Z_]+$/, ""));

      console.log("Apenas letras maiúsculas e underscore ( _ )");
    } else if (role.length > MAX_ROLE_FIELD) {
      console.log(`Quantidade de caracteres maximo de ${MAX_ROLE_FIELD}`);
      setRole(role.slice(0, MAX_ROLE_FIELD));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        role: "Matrícula inválida",
      }));
    }
  }

  if (validateRole(role)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      role: "",
    }));
  }
};

export const handleChangeDescription = (
  descricao: any,
  setErrorMessages: any,
  setDescription: any
) => {
  setDescription(descricao);

  if (!validatePermissionDescription(descricao)) {
    if (!validateOnlyLetters(descricao)) {
      setDescription(descricao.replace(/[^a-zA-ZÀ-ÿ]+$/, ""));

      console.log("Permitido apenas letras");
    } else if (descricao.length > MAX_DESCRICAO_FIELD) {
      console.log(`Quantidade de caracteres maximo de ${MAX_DESCRICAO_FIELD}`);
      setDescription(descricao.slice(0, MAX_DESCRICAO_FIELD));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        descricao: "Matrícula inválida",
      }));
    }
  }

  if (validatePermissionDescription(descricao)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      descricao: "",
    }));
  }
};
