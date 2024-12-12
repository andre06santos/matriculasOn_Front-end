import {
  cleanErrorMessages,
  handleChangeNoWhiteSpaceInput,
  MAX_DESCRICAO_FIELD,
  MAX_ROLE_FIELD,
  updateErrorMessages,
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
  handleChangeNoWhiteSpaceInput(role, setRole);
  const isRoleValid = validateRole(role);
  const fieldKey = "role";

  if (isRoleValid) {
    cleanErrorMessages(setErrorMessages, fieldKey);
  } else {
    if (!!role && !validateLettersAndUnderscore(role)) {
      const roleOnlyUpperAndUndersc = role.slice(0, -1);
      setRole(roleOnlyUpperAndUndersc);
      console.log("Apenas letras maiúsculas e underscore ( _ )");
    } else if (role.length > MAX_ROLE_FIELD) {
      const roleWithMaxLenght = role.slice(0, MAX_ROLE_FIELD);
      setRole(roleWithMaxLenght);
      console.log(`Quantidade de caracteres maximo de ${MAX_ROLE_FIELD}`);
    } else {
      const messageObject = { role: "Digite a role corretamente" };
      updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    }
  }
};

export const handleChangeDescription = (
  description: any,
  setErrorMessages: any,
  setDescription: any
) => {
  handleChangeNoWhiteSpaceInput(description, setDescription);
  const isDescriptionValid = validatePermissionDescription(description);
  const fieldKey = "descricao";

  if (isDescriptionValid) {
    cleanErrorMessages(setErrorMessages, fieldKey);
  } else {
    if (!!description && !validateOnlyLetters(description)) {
      const descricaoOnlyLetters = description.slice(0, -1);
      setDescription(descricaoOnlyLetters);
      console.log("Permitido apenas letras");
    } else if (description.length > MAX_DESCRICAO_FIELD) {
      const descricaoWithMaxLength = description.slice(0, MAX_DESCRICAO_FIELD);
      setDescription(descricaoWithMaxLength);
      console.log(`Quantidade de caracteres maximo de ${MAX_DESCRICAO_FIELD}`);
    } else {
      const messageObject = { descricao: "Digite a descrição corretamente" };
      updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    }
  }
};

export const handleChangeFilterDescription = (
  description: any,
  setDescription: any
) => {
  handleChangeNoWhiteSpaceInput(description, setDescription);

  if (!!description && !validateOnlyLetters(description)) {
    const descricaoOnlyLetters = description.slice(0, -1);
    setDescription(descricaoOnlyLetters);
    console.log("Permitido apenas letras");
  } else if (description.length > MAX_DESCRICAO_FIELD) {
    const descricaoWithMaxLength = description.slice(0, MAX_DESCRICAO_FIELD);
    setDescription(descricaoWithMaxLength);
    console.log(`Quantidade de caracteres maximo de ${MAX_DESCRICAO_FIELD}`);
  }
};
