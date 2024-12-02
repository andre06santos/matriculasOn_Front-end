import {
  MAX_CURSO_FIELD,
  validateCourseName,
  validateOnlyLetters,
} from "./formValidationUtils";

export const handleChangeCourseName = (
  nome: any,
  setErrorMessages: any,
  setNome: any
) => {
  setNome(nome);
  const isCourseNameValid = validateCourseName(nome);

  if (isCourseNameValid) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      nome: "",
    }));
  } else {
    if (!validateOnlyLetters(nome)) {
      const nomeOnlyLetters = nome.replace(/[^a-zA-ZÀ-ÿ´`~^]+$/, "");
      setNome(nomeOnlyLetters);
      console.log("Permitido apenas letras");
      return;
    } else if (nome.length > MAX_CURSO_FIELD) {
      const nomeWithMaxLength = nome.slice(0, MAX_CURSO_FIELD);
      setNome(nomeWithMaxLength);
      console.log(`Quantidade de caracteres maximo de ${MAX_CURSO_FIELD}`);
      return;
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        nome: "Matrícula inválida",
      }));
    }
  }
};
