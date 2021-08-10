import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
  return (
    <>
      <div className="relative mr-6 my-2 flex shadow-md rounded-lg">
        <input
          type="text"
          className=" border-0 p-2 pl-4 focus:outline-none rounded-lg"
          placeholder="Search"
        />
        <FiSearch size="20" className="my-auto mr-3" />
        {/* <div className="absolute"></div> */}
      </div>
    </>
  );
};
export default Search;
