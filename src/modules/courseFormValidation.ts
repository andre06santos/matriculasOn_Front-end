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
  setErrorMessages: any,
  setNome: any
) => {
  handleChangeNoWhiteSpaceInput(nome, setNome);
  const isCourseNameValid = validateCourseName(nome.trim());
  const fieldKey = "curso";

  if (isCourseNameValid) {
    cleanErrorMessages(setErrorMessages, fieldKey);
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
      const messageObject = { nome: "Digite o nome corretamente" };
      updateErrorMessages(setErrorMessages, fieldKey, messageObject);
    }
  }
};

export const handleChangeFilterCourseNome = (nome: any, setNome: any) => {
  handleChangeNoWhiteSpaceInput(nome, setNome);

  if (!!nome && !validateOnlyLetters(nome)) {
    const nomeOnlyLetters = nome.slice(0, -1);
    setNome(nomeOnlyLetters);
    console.log("Digite apenas letras");
  } else if (nome.length > MAX_CURSO_FIELD) {
    const nomeWithMaxLength = nome.slice(0, MAX_CURSO_FIELD);
    setNome(nomeWithMaxLength);
    console.log(`Quantidade de caracteres maximo de ${MAX_CURSO_FIELD}`);
  }
};
