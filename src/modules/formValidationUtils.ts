export const TEN_CARAC = 10;
export const MAX_MATRICULA_FIELD = 10;
export const MAX_USERNAME_FIELD = 10;
export const MAX_NOME_FIELD = 50;
export const MAX_CARGO_FIELD = 30;
export const MAX_DEPARTAMENTO_FIELD = 30;
export const MAX_DESCRICAO_FIELD = 100;
export const MAX_ROLE_FIELD = 20;
export const MAX_CURSO_FIELD = 30;
export const MIN_PASSWORD = 8;
export const MIN_EMAIL = 7;
export const CPF_LENGTH = 11;

const regexOnlyLetters = new RegExp("^[\\p{L}\\s]+$", "u");
const regexValidEmail = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
);
const regexOnlyNumbers = new RegExp("[0-9]+$");
const regexLettersAndNumbers = new RegExp("^[a-zA-Z0-9]+$");
const regexUpperLettersAndUnderscore = new RegExp("^[A-Z_]+$");

export const validateOnlyLetters = (valor: any) => {
  const apenasLetras = regexOnlyLetters.test(valor);
  return apenasLetras;
};

export const validateOnlyNumbers = (valor: any) => {
  const apenasNumeros = regexOnlyNumbers.test(valor);
  return apenasNumeros;
};

export const validateLettersAndNumbers = (valor: any) => {
  const letrasENumberos = regexLettersAndNumbers.test(valor);
  return letrasENumberos;
};

export const validateEmailFormat = (valor: any) => {
  const emailValido = regexValidEmail.test(valor);
  return emailValido;
};

export const validateCpf = (valor: string) => {
  const onlyNumbers = validateOnlyNumbers(valor);
  const elevenNumbers = valor.length === CPF_LENGTH;
  return onlyNumbers && elevenNumbers;
};

export const validateMatricula = (valor: string) => {
  const onlyNumbersAndNumbers = validateLettersAndNumbers(valor);
  const checkLength = valor.length <= MAX_MATRICULA_FIELD && valor.length > 0;
  return onlyNumbersAndNumbers && checkLength;
};

export const validateNome = (valor: string) => {
  const onlyLetters = validateOnlyLetters(valor);
  const maxLength = valor.length <= MAX_NOME_FIELD && valor.length > 0;
  return onlyLetters && maxLength;
};

export const validateUsername = (valor: string) => {
  const maxLength = valor.length <= MAX_USERNAME_FIELD && valor.length > 0;
  return maxLength;
};

export const validateEmail = (valor: string) => {
  const validEmail = validateEmailFormat(valor);
  const minLength = valor.length >= MIN_EMAIL;
  return validEmail && minLength;
};

export const validatePassword = (valor: string) => {
  const minLength = valor.length >= MIN_PASSWORD;
  return minLength;
};

export const validateLettersAndUnderscore = (valor: string) => {
  const containsOnlyLettersAndUnderscore =
    regexUpperLettersAndUnderscore.test(valor);
  return containsOnlyLettersAndUnderscore;
};

export const validateRole = (valor: string) => {
  const maxLength = valor.length <= MAX_ROLE_FIELD;
  const validation = regexUpperLettersAndUnderscore.test(valor);
  return maxLength && validation;
};

export const validatePermissionDescription = (valor: string) => {
  const onlyLetters = validateOnlyLetters(valor);
  const maxLength = valor.length <= MAX_DESCRICAO_FIELD;
  return onlyLetters && maxLength;
};

export const validateCourseName = (valor: string) => {
  const onlyLetters = validateOnlyLetters(valor);
  const maxLength = valor.length <= MAX_CURSO_FIELD;
  return onlyLetters && maxLength;
};

export const validateCargo = (valor: string) => {
  const onlyLetters = validateOnlyLetters(valor);
  const maxLength = valor.length <= MAX_CARGO_FIELD;
  return onlyLetters && maxLength;
};

export const validateDepartamento = (valor: string) => {
  const onlyLetters = validateOnlyLetters(valor);
  const maxLength = valor.length <= MAX_DEPARTAMENTO_FIELD;
  return onlyLetters && maxLength;
};
