import {
  cleanErrorMessages,
  handleChangeNoWhiteSpaceInput,
  MAX_CURSO_FIELD,
  updateErrorMessages,
  validateCourseName,
  validateOnlyLetters,
} from "./formValidationUtils";

export const handleCourseName = (
  nome: any,
  setNome: any
) => {
  const hasError = !validateOnlyLetters(nome) || nome.length > MAX_CURSO_FIELD;

  if (nome === "") {
    setNome(nome);
    return;
  }

  if (hasError) {
    showCourseNomeError(nome);
    return;
  }

  setNome(nome);
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