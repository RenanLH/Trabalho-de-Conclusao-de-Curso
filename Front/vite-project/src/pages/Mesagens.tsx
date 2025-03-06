import ListMensagens from "../components/ListMensagens";
import SelectLanguage from "../components/SelectLanguage";

const Mensagens = () => {
  return (
    <div>
      <div className="grid grid-flow-col grid-cols-2 ">
        <div className="col-start-3 p-2 me-4">
          <SelectLanguage changeLanguage={() => {}} />
        </div>
      </div>
      <h1 className="text-center">Mensagens</h1>

      <div className="flex flex-row">
        <ListMensagens />
      </div>
    </div>
  );
};

export default Mensagens;