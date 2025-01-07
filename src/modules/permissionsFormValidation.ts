import { toast } from "react-toastify";
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
    toast("Apenas letras maiúsculas e underscore ( _ )", {
      position: "top-center",
      type: "error",
    });
    return;
  }

  setRole(role);

  if (!hasSize) {
    toast(`Quantidade de caracteres maximo de ${MAX_ROLE_FIELD}`, {
      position: "top-center",
      type: "error",
    });
    return;
  }
};

export const handleChangeDescription = (
  description: any,
  setDescription: any
) => {
  const hasOnlyLetters = validateOnlyLetters(description);
  const hasSize = description.length < MAX_DESCRICAO_FIELD;
  const trimmedDescription = description.trim();

  if (trimmedDescription === "") {
    setDescription(trimmedDescription);

    return;
  }

  if (!hasOnlyLetters) {
    toast("Permitido apenas letras!", {
      position: "top-center",
      type: "error",
    });
    return;
  }

  if (!hasSize) {
    toast(`Quantidade de caracteres maximo de ${MAX_DESCRICAO_FIELD}`, {
      position: "top-center",
      type: "error",
    });
    return;
  }

  setDescription(description);
};
