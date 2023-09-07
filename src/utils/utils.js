// numberExtractor from select value
export function extractNumbersFromString(inputString) {
  const parts = inputString.split(/\D+/); 
  const numbersOnly = parts.filter((part) => part !== "").join("");

  return numbersOnly;
}
