export const maskEmail = (str) => {
  const [name, domain] = str.split('@');
  if (name.length <= 4) return str;
  return `${name.substring(0, 2)}***${name.slice(-2)}@${domain}`;
};
