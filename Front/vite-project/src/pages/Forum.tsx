import ListCard from "../components/ListCard";
import SearchBar from "../components/SearchBar";
import SelectLanguage from "../components/SelectLanguage";

const Forum = () => {
  return (
    <div>
      <div className="grid grid-flow-col grid-cols-2 ">
        <div className="col-start-2 ">
          <SearchBar />
        </div>
        <div className="col-start-3 p-2 me-4">
          <SelectLanguage changeLanguage={() => {}} />
        </div>
      </div>
      <h1 className="text-center">Forum</h1>

      <div className="flex flex-row">
        <ListCard />
      </div>
    </div>
  );
};

export default Forum;
