import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";

library.add(faMagnifyingGlass);

interface SearchBarProps {
  isDarkMode: boolean
}

const SearchBar = ({ isDarkMode }: SearchBarProps) => {
  const [query, setQuery] = useState<string>("");

  const onSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setQuery(query.trim());

    if (query.trim().length >= 3){
      console.log("aaaaaaa", query.length)
      window.location.href = `/forum/buscar?q=${query}`
    }
  }

  return (
    <div className="">
      <form action="" onSubmit={onSubmit}>
        <div className="rounded flex ml-auto gap-x-2.5 sm:w-3/6 lg:w-10/12">
          <div className={`mt-2 `}>
            <FontAwesomeIcon icon={faMagnifyingGlass} color={`${isDarkMode ? "white" : "black"}`} />
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar"
            className="form-control rounded border border-slate-800 bg-slate-50 p-1 w-full dark:bg-slate-500" />
        </div>

      </form >
    </div>


  );
};

export default SearchBar;
