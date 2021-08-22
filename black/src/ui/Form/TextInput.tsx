import React from "react";
import { joinClass } from "../../lib/joinClass";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Input from "../TextInput/Input";

interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  label?: string;
  loading?: boolean;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
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
    <div className="flex flex-col mx-1 w-full">
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
          <Input
            type="text"
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
  );
};
export default TextInput;
