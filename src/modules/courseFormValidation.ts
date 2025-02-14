import { toast } from "react-toastify";
import { MAX_CURSO_FIELD, validateOnlyLetters } from "./formValidationUtils";
import { SetStateAction } from "react";

export const handleCourseName = (
  nome: string,
  setNome: React.Dispatch<SetStateAction<string>>
) => {
  const hasError = !validateOnlyLetters(nome) || nome.length > MAX_CURSO_FIELD;

  const trimmedNome = nome.trim();

  if (trimmedNome === "") {
    setNome(trimmedNome);
    return;
  }

  if (hasError) {
    showCourseNomeError(nome);
    return;
  }

  setNome(nome);
};

const showCourseNomeError = (nome: string) => {
  const hasOnlyLetters = validateOnlyLetters(nome);

  if (!hasOnlyLetters) {
    toast("Caractere nao permitido!", {
      position: "top-center",
      type: "error",
    });
    return;
  }

  if (nome.length > MAX_CURSO_FIELD) {
    toast(`Quantidade de caracteres maximo de ${MAX_CURSO_FIELD}`, {
      position: "top-center",
      type: "error",
    });
    return;
  }
};
