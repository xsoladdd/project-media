// Reference
// https://codesandbox.io/s/convert-file-to-base64-in-react-lqi1e

export const getBase64 = (file: Blob): Promise<string> => {
  return new Promise((resolve) => {
    let baseURL: string | ArrayBuffer | null = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
      if (typeof baseURL === "string") resolve(baseURL);
    };
  });
};
