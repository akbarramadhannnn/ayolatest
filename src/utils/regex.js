export const RegexMin8Char = text => {
  return /.{8,}/.test(text);
};

export const RegexLowercase = text => {
  return /^(?=.*[a-z])/.test(text);
};

export const RegexUppercase = text => {
  return /^(?=.*[A-Z])/.test(text);
};

export const RegexSpecialChar = text => {
  return /^(?=.*?[#?!@$%^&*-])/.test(text);
};

export const RegexEmail = text => {
  return /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test(text);
};
