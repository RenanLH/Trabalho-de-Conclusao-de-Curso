import SelectLanguage from "./SelectLanguage";

type headerProps = {
    changeLanguage: (e:string) => void;
    texto: string;
};

const Header = (props: headerProps) => {

    const {changeLanguage, texto} = props;
    return (
    <header className="bg-blue-700 text-white p-6">
        <div className="flex-auto  ">
            <div className="justify-center text-center">
            <h1 className=" text-center text-3xl font-bold">{texto}</h1>

            </div>
          <div className="flex justify-end text-center ">
            {<SelectLanguage changeLanguage={changeLanguage} />}
          </div>
  
          </div>
      </header>
    );}

export default Header;