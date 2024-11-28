import { verifyCourseName, verifyOnlyLetters } from "./formValidationUtils";

export const handleChangeCourseName = (
  e: any,
  setErrorMessages: any,
  setNome: any
) => {
  const actualNome = e.target.value;
  setNome(actualNome);

  if (!verifyCourseName(actualNome)) {
    if (!verifyOnlyLetters(actualNome)) {
      setNome(actualNome.replace(/[^a-zA-ZÀ-ÿ]+$/, ""));

      console.log("Permitido apenas letras");
    } else if (actualNome.length > 20) {
      console.log("Quantidade de caracteres maximo de 50");
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        nome: "Quantidade de caracteres maximo de 50",
      }));
      setNome(actualNome.slice(0, 50));
    } else {
      setErrorMessages((prevErrors: any) => ({
        ...prevErrors,
        nome: "Matrícula inválida",
      }));
    }
  }

  if (verifyCourseName(actualNome)) {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      nome: "",
    }));
  }
};
