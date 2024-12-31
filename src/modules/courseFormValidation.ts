import { MAX_CURSO_FIELD, validateOnlyLetters } from "./formValidationUtils";

export const handleCourseName = (nome: any, setNome: any) => {
  const hasError = !validateOnlyLetters(nome) || nome.length > MAX_CURSO_FIELD;

  const trimmedNome = nome.trim();

  if (trimmedNome === "") {
    setNome(trimmedNome);
    return;
  }

  if (hasError) {
    showCourseNomeError(trimmedNome);
    return;
  }

  setNome(trimmedNome);
};

const showCourseNomeError = (nome: any) => {
  const hasOnlyLetters = validateOnlyLetters(nome);

  if (!hasOnlyLetters) {
    console.log("Caractere nao permitido");
    return;
  }

  if (nome.length > MAX_CURSO_FIELD) {
    console.log(`Quantidade de caracteres maximo de ${MAX_CURSO_FIELD}`);
    return;
  }
};
