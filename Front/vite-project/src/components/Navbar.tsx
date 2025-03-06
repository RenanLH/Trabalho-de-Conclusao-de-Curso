import { Link } from "react-router-dom";
import logo_unioeste from "../assets/logomarca_Unioeste_jpg-Photoroom.png"
import logo_inicio from "../assets/home-svgrepo-com.svg"
import logo_help from "../assets/help-info-question-support-svgrepo-com.svg"
import logo_forum from "../assets/list-svgrepo-com.svg"
import logo_login from "../assets/user-circle-svgrepo-com.svg"
import logo_mail from "../assets/mail-svgrepo-com.svg"
import SearchBar from "./SearchBar";


const Navbar = () => {
  return (
    <div className=" grid grid-flow-col grid-cols-3 p-2 border-3 border-b-gray-400 ">
        
        <div className="flex gap-2 col-start-1 col-span-3">
          <a  href="https://www.unioeste.br/portal/"><img className="h-20 ml-24" src={logo_unioeste} alt="" /></a>
          <div className="flex-auto mr-20 mt-8">
            <SearchBar/>
          </div>
        </div>
        
        <div className="flex col-start-4 gap-20">
          <div className="flex gap-2 mt-8">
            <Link to="/home"><img className="size-10" src={logo_inicio} alt="" /></Link>
            <p className="mt-2">Inicio</p>
          </div>
          
          <div className="p-2 flex gap-2 mt-4">
            <Link to="/duvidas"><img className="size-10" src={logo_help} alt="" /></Link>
            <p className="mt-2">Perguntas Frequentes</p>
          </div>

          <div className="flex p-2 mt-6 gap-2 ">
            <Link to="/forum"><img className="size-10" src={logo_forum} alt="" /></Link>
            <p className="mt-2"> Forum</p>
          </div>
          {true && 
          <div className="flex p-2 mt-6 gap-2 ">
            <Link to="/mensagens"><img className="size-10" src={logo_mail} alt="" /></Link>
            <p className="mt-2"> Mensagens</p>
          </div>
          
          }
         

          <div className="flex p-2 mt-6 mr-20 gap-2 ">
            <Link to="/login"><img className="size-10" src={logo_login} alt="" /></Link>
            <p className="mt-2">Login</p>
          </div>

        </div>
     

      
    </div>
  );
};

export default Navbar;
