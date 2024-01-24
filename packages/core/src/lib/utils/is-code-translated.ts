export const isCodeTranslated = (prefix: string, translatedValue: string) => {
  let parsedCode;
  if (translatedValue.includes(prefix)) {
    parsedCode = translatedValue.split(prefix)[0];
    return prefix === parsedCode;
  }

  return true;
};
