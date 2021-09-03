import { Switch } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiSun } from "react-icons/fi";
import { RiMoonClearLine } from "react-icons/ri";
import { joinClass } from "../../lib/joinClass";
import { getDarkModeStatus, setDarkMode } from "../../lib/jscookies";

const DarkmodeSwitch: React.FC<{}> = ({}) => {
  const { setTheme } = useTheme();

  const [isDark, setIsDark] = useState(getDarkModeStatus());

  const setMode = () => {
    setDarkMode(!isDark);
    setIsDark(!isDark);
  };

  useEffect(() => {
    // setTheme(theme === "dark" ? "light" : "dark");
    setTheme(isDark ? "dark" : "light");
    return () => {};
  }, [isDark]);

  return (
    <>
      <Switch
        checked={isDark}
        onChange={setMode}
        className={joinClass(
          `relative inline-flex items-center h-10 rounded-full w-18  border-2`,
          isDark ? "bg-gray-600 " : "bg-gray-100  border-gray-400"
        )}
      >
        {/* <span className="sr-only transform transition ease-in-out duration-200"></span> */}
        <span
          className={joinClass(
            `inline-block  h-7 w-7  rounded-full transform transition ease-in-out duration-200 `,
            isDark
              ? "translate-x-9 bg-green-300 text-gray-600"
              : "translate-x-1 bg-green-600 text-gray-100",
            `flex place-content-center place-items-center`
          )}
        >
          {isDark ? <FiSun /> : <RiMoonClearLine />}
        </span>
      </Switch>
    </>
  );
};
export default DarkmodeSwitch;
