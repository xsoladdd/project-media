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

// Reference
// https://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript

export const getBlobFromBase64 = async (dataURI: string): Promise<Blob> => {
  // convert base64 to raw binary data held in a string
  const blob = await (await fetch(dataURI)).blob();
  return new File([blob], "fileName.jpg", { type: "image/jpeg" });
};
