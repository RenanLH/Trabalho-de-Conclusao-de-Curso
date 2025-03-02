import SelectLanguage from "../components/SelectLanguage";



const Home = () => {
  return (
    <div>
      <div className="grid grid-flow-row  grid-rows-6">
      <div className="grid grid-flow-col grid-cols-2 ">
        <div className="col-start-3 p-2 me-4">{<SelectLanguage changeLanguage={() => {}} />}</div>
      </div>
        <div className="row-start-2">
          <h1 className="text-center">Plataforma de apoio a migrantes</h1>
        </div>
        <div className="row-start-5">
        </div>
      </div>
    </div>
  );
};

export default Home;
