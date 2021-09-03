import { Switch as SwitchHeadless } from "@headlessui/react";
import React from "react";

interface SwitchProps {
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const Switch: React.FC<SwitchProps> = ({ status, setStatus }) => {
  return (
    <div className="py-16">
      <SwitchHeadless
        checked={status}
        onChange={setStatus}
        className={`${
          status ? "bg-blue-600" : "bg-gray-200"
        } relative inline-flex items-center h-6 rounded-full w-11`}
      >
        <span className="sr-only transform transition ease-in-out duration-200">
          Enable notifications
        </span>
        <span
          className={`${
            status ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 bg-white rounded-full transform transition ease-in-out duration-200`}
        />
      </SwitchHeadless>
    </div>
  );
};
export default Switch;
