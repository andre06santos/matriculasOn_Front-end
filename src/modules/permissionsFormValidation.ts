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
      const roleOnlyUpperAndUndersc = role.replace(/[^A-Z_]+$/, "");
      setRole(roleOnlyUpperAndUndersc);

      console.log("Apenas letras maiúsculas e underscore ( _ )");
    } else if (role.length > MAX_ROLE_FIELD) {
      const roleWithMaxLenght = role.slice(0, MAX_ROLE_FIELD);
      setRole(roleWithMaxLenght);
      console.log(`Quantidade de caracteres maximo de ${MAX_ROLE_FIELD}`);
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        role: "Role inválida",
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
      const descricaoOnlyLetters = descricao.replace(/[^a-zA-ZÀ-ÿ]+$/, "");
      setDescription(descricaoOnlyLetters);

      console.log("Permitido apenas letras");
    } else if (descricao.length > MAX_DESCRICAO_FIELD) {
      const descricaoWithMaxLength = descricao.slice(0, MAX_DESCRICAO_FIELD);
      setDescription(descricaoWithMaxLength);
      console.log(`Quantidade de caracteres maximo de ${MAX_DESCRICAO_FIELD}`);
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        descricao: "Descrição inválida",
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
