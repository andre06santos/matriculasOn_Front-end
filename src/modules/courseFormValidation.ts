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
  const isCourseNameValid = validateCourseName(nome.trim());

  if (isCourseNameValid) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      nome: "",
    }));
  } else {
    if (!!nome && !validateOnlyLetters(nome)) {
      const nomeOnlyLetters = nome.slice(0, -1);
      setNome(nomeOnlyLetters);
      console.log("Digite apenas letras");
    } else if (nome.length > MAX_CURSO_FIELD) {
      const nomeWithMaxLength = nome.slice(0, MAX_CURSO_FIELD);
      setNome(nomeWithMaxLength);
      console.log(`Quantidade de caracteres maximo de ${MAX_CURSO_FIELD}`);
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        nome: "Matrícula inválida",
      }));
    }
  }
};
