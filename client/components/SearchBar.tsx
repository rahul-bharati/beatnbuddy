import type { NextComponentType } from "next";
import Search from "./Search";

const SearchBar: NextComponentType = () => {
  return (
    <div className="w-100 bg-white py-10 px-4 my-5">
      <div className="flex flex-col xs:flex-row items-center justify-center max-w-[992px] mx-auto">
        <Search />
        <div className="text-gray-900 font-bold mx-5 text-xl my-3">or</div>
        <button className="btn px-3 py-2 bg-green-600 text-white rounded-lg shadow-lg text-lg md:1/4 lg:w-1/5">
          Upload your own
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
