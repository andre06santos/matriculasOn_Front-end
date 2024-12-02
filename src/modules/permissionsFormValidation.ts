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
  const isRoleValid = validateRole(role);

  if (isRoleValid) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      role: "",
    }));
  } else {
    if (!validateLettersAndUnderscore(role)) {
      const roleOnlyUpperAndUndersc = role.replace(/[^A-Z_]+$/, "");
      setRole(roleOnlyUpperAndUndersc);
      console.log("Apenas letras maiúsculas e underscore ( _ )");
      return;
    } else if (role.length > MAX_ROLE_FIELD) {
      const roleWithMaxLenght = role.slice(0, MAX_ROLE_FIELD);
      setRole(roleWithMaxLenght);
      console.log(`Quantidade de caracteres maximo de ${MAX_ROLE_FIELD}`);
      return;
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        role: "Role inválida",
      }));
    }
  }
};

export const handleChangeDescription = (
  descricao: any,
  setErrorMessages: any,
  setDescription: any
) => {
  setDescription(descricao);
  const isDescriptionValid = validatePermissionDescription(descricao);

  if (isDescriptionValid) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      descricao: "",
    }));
  } else {
    if (!validateOnlyLetters(descricao)) {
      const descricaoOnlyLetters = descricao.replace(/[^a-zA-ZÀ-ÿ]+$/, "");
      setDescription(descricaoOnlyLetters);
      console.log("Permitido apenas letras");
      return;
    } else if (descricao.length > MAX_DESCRICAO_FIELD) {
      const descricaoWithMaxLength = descricao.slice(0, MAX_DESCRICAO_FIELD);
      setDescription(descricaoWithMaxLength);
      console.log(`Quantidade de caracteres maximo de ${MAX_DESCRICAO_FIELD}`);
      return;
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        descricao: "Descrição inválida",
      }));
    }
  }
};
