import React from "react";

interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const TextArea: React.FC<TextAreaProps> = ({ ...rest }) => {
  return (
    <textarea
      className="w-full  h-28 appearance-none block bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-2 px-4 dark:bg-gray-700 dark:border-gray-900 "
      {...rest}
    />
  );
};
export default TextArea;
