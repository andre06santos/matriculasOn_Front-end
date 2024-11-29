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

  if (!validateCourseName(nome)) {
    if (!validateOnlyLetters(nome)) {
      setNome(nome.replace(/[^a-zA-ZÀ-ÿ´`~^]+$/, ""));

      console.log("Permitido apenas letras");
    } else if (nome.length > MAX_CURSO_FIELD) {
      console.log(`Quantidade de caracteres maximo de ${MAX_CURSO_FIELD}`);
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        nome: `Quantidade de caracteres maximo de ${MAX_CURSO_FIELD}`,
      }));
      setNome(nome.slice(0, MAX_CURSO_FIELD));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        nome: "Matrícula inválida",
      }));
    }
  }

  if (validateCourseName(nome)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      nome: "",
    }));
  }
};
