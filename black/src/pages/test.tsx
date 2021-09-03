import React from "react";
import DarkmodeSwitch from "../components/DarkmodeSwitch/DarkmodeSwitch";

interface testProps {}

const Test: React.FC<testProps> = ({}) => {
  // const { theme, setTheme } = useTheme();
  // const [isTrue, setIsTrue] = useState(true);
  return (
    <>
      <h1 className=" dark:bg-yellow-800 text-3xl text-pink-500 ">
        Welcome to Your App
      </h1>

      <div className="bg-red-300 h-24 w-24 dark:bg-yellow-300"></div>

      <DarkmodeSwitch />
    </>
  );
};
export default Test;
