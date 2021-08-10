export const joinClass = (...classes: Array<string>) => {
  return classes.filter(Boolean).join(" ");
};
