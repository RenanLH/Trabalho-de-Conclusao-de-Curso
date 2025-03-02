import { Link } from "react-router-dom";
import logo_Unioeste from "../assets/logomarca_Unioeste_jpg-Photoroom.png"

const Navbar = () => {
  return (
    <div className="grid grid-flow-col p-2 border-3 border-b-gray-400 bg-green-400">
      <div className="ms-40 bg-yellow-500 flex items-center gap-11" >
         <a  href="https://www.unioeste.br/portal/"><img className=" h-24 w-52" src={logo_Unioeste} alt="" /></a>
         <div className="items-end bg-blue-900">
          <Link to="/home">Inicio</Link>
         </div>
      </div>

      <div className="grid grid-flow-col ">
        <div className="p-2 text-center mt-8 bg-red-500">
          <Link to="/duvidas">Duvidas</Link>
        </div>

        <div className="text-center p-2 mt-8 bg-blue-500">
          <Link to="/forum">Forum</Link>
        </div>

        <div className="text-end p-2 mt-8 bg-purple-500">
          <Link className="mr-4" to="/login">Login</Link>
          <Link className="mr-4" to="/cadastro">Cadastro</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
