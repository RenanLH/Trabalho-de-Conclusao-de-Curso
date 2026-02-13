import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faMagnifyingGlass);

interface SearchBarProps {
  isDarkMode: boolean
}

const SearchBar = ({ isDarkMode }: SearchBarProps) => {
  return (
    <div className="rounded flex ml-auto gap-x-2.5 sm:w-3/6 lg:w-10/12">
      <div className={`mt-2 `}>
        <FontAwesomeIcon icon={faMagnifyingGlass} color={`${isDarkMode ? "white" : "black"}`} />
      </div>
      <input
        type="search"
        placeholder="Pesquisar"
        className="form-control rounded border border-slate-800 bg-slate-50 p-1 w-full dark:bg-slate-500"/>
    </div>
  );
};

export default SearchBar;
