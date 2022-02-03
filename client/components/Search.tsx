import type { NextComponentType } from "next";
import { AiOutlineSearch } from "react-icons/ai";

const Search: NextComponentType = () => {
  return (
    <div className="flex align-center justify-center flex-1 w-full xs:w-auto relative">
      <input
        type="text"
        className="bg-gray-200 w-full border-0 text-lg px-4 py-2 rounded-lg text-gray-900 font-bold"
        placeholder="Search for artist, band, songs or podcasts"
      />
      <button className="btn bg-transparent absolute top-0 right-0 h-full w-auto text-2xl p-2 px-4 font-bold">
        <AiOutlineSearch />
      </button>
    </div>
  );
};

export default Search;
