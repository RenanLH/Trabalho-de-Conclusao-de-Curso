import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faMagnifyingGlass);

const SearchBar = () => {
  return (
    <div className="input-groud rounded flex gap-x-2.5 justify-between sm:w-full lg:w-3/6">
      <input 
        type="search"
        placeholder="Pesquisar"
        className="form-control rounded"
      />
      <div className="mt-2">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
    </div>
  );
};

export default SearchBar;
