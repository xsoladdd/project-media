import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import TextArea from "../TexteArea";
import { joinClass } from "../../lib/joinClass";

interface TextAreaInputProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  className?: string;
  label?: string;
  loading?: boolean;
  error?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  className = "",
  label,
  required,
  id,
  name,
  loading = false,
  error,
  ...rest
}) => {
  return (
    <>
      <div className="flex flex-col mx-1">
        {label && (
          <label
            htmlFor={id}
            className="font-semibold text-gray-600 text-xs leading-8 uppercase h-6  "
          >
            {label} {required && <span className="text-red-400">*</span>}
          </label>
        )}
        <div className="flex-1 ">
          <div className="bg-white my-1 p-1 flex border border-gray-200 rounded mx-1 ">
            <TextArea
              id={id}
              className={joinClass(
                "p-1 px-2 appearance-none outline-none w-full text-gray-800",
                className
              )}
              {...rest}
            />
            {loading && (
              <span className="my-auto pr-3">
                <AiOutlineLoading3Quarters className="animate-spin" />
              </span>
            )}
          </div>
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    </>
  );
};
export default TextAreaInput;
