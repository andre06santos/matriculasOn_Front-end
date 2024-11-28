export const verifyOnlyLetters = (valor: any) => {
  const apenasLetras = /^[a-zA-ZÀ-ÿ]+$/.test(valor);
  return apenasLetras;
};

export const verifyOnlyNumbers = (valor: any) => {
  const apenasNumeros = /[0-9]+$/.test(valor);
  return apenasNumeros;
};

export const verifyLettersAndNumbers = (valor: any) => {
  const letrasENumberos = /^[a-zA-Z0-9]+$/.test(valor);
  return letrasENumberos;
};

export const verifyEmailFormat = (valor: any) => {
  const emailValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    valor
  );
  return emailValido;
};

export const verifyCpf = (valor: string) => {
  const onlyNumbers = verifyOnlyNumbers(valor);
  const elevenNumbers = valor.length === 11;
  return onlyNumbers && elevenNumbers;
};

export const verifyMatricula = (valor: string) => {
  const onlyNumbersAndNumbers = verifyLettersAndNumbers(valor);
  const checkLength = valor.length <= 10 && valor.length > 0;
  return onlyNumbersAndNumbers && checkLength;
};

export const verifyNome = (valor: string) => {
  const onlyLetters = verifyOnlyLetters(valor);
  const maxLength = valor.length <= 50 && valor.length > 0;
  return onlyLetters && maxLength;
};

export const verifyUsername = (valor: string) => {
  const maxLength = valor.length <= 15 && valor.length > 0;
  return maxLength;
};

export const verifyEmail = (valor: string) => {
  const validEmail = verifyEmailFormat(valor);
  const minLength = valor.length >= 7;
  return validEmail && minLength;
};

export const verifyPassword = (valor: string) => {
  const minLength = valor.length >= 8;
  return minLength;
};

export const verifyLettersAndUnderscore = (valor: string) => {
  const containsOnlyLettersAndUnderscore = /^[A-Z_]+$/.test(valor);
  return containsOnlyLettersAndUnderscore;
};

export const verifyRole = (valor: string) => {
  const maxLength = valor.length <= 20;
  const validation = /^[A-Z_]+$/.test(valor);
  return maxLength && validation;
};

export const verifyPermissionDescription = (valor: string) => {
  const onlyLetters = verifyOnlyLetters(valor);
  const maxLength = valor.length <= 100;
  return onlyLetters && maxLength;
};

export const verifyCourseName = (valor: string) => {
  const onlyLetters = verifyOnlyLetters(valor);
  const maxLength = valor.length <= 50;
  return onlyLetters && maxLength;
};
