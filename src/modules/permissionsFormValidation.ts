import {
  MAX_DESCRICAO_FIELD,
  MAX_ROLE_FIELD,
  validateLettersAndUnderscore,
  validateOnlyLetters,
} from "./formValidationUtils";

export const handleChangeRole = (role: any, setRole: any) => {
  const hasPermitedCharac = validateLettersAndUnderscore(role);
  const hasSize = role.length < MAX_ROLE_FIELD;

  if (!hasPermitedCharac) {
    console.log("Apenas letras maiúsculas e underscore ( _ )");
    return;
  }

  setRole(role);

  if (!hasSize) {
    console.log(`Quantidade de caracteres maximo de ${MAX_ROLE_FIELD}`);
    return;
  }
};

export const handleChangeDescription = (
  description: any,
  setDescription: any
) => {
  const hasOnlyLetters = validateOnlyLetters(description);
  const hasSize = description.length < MAX_DESCRICAO_FIELD;

  description = description.trim();

  if (!hasOnlyLetters) {
    console.log("Permitido apenas letras");
    return;
  }

  if (!hasSize) {
    console.log(`Quantidade de caracteres maximo de ${MAX_DESCRICAO_FIELD}`);
    return;
  }

  setDescription(description);
};
