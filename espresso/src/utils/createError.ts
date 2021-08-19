export const createError = (field: string, message: string) => {
  return {
    field,
    message,
  };
};
