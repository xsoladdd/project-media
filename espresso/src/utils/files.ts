export const getFileExtension = (fileName: string): string => {
  const arrayHolder = fileName.split(".");

  return arrayHolder[arrayHolder.length - 1];
};
