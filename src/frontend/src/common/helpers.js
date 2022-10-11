export const getCroppedWord = (substring) => {
  const arrayString = substring.split("/");
  const tempString = arrayString[arrayString.length - 1];
  const resultString = tempString.substr(0, tempString.length - 4);
  return resultString;
};
