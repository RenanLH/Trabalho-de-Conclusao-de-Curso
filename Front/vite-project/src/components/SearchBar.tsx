import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faMagnifyingGlass);

const SearchBar = () => {
  return (
    <div className="rounded flex ml-auto gap-x-2.5 sm:w-3/6 lg:w-10/12">
       <div className="mt-2">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <input 
        type="search"
        placeholder="Pesquisar"
        className="form-control rounded"
      />
     
    </div>
  );
};

export default SearchBar;
