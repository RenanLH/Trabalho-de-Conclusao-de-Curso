import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Responder from "../components/Responder";

const NovaMensagem = () => {

    const { t, i18n } = useTranslation();

    return (
        
        <div className="flex flex-col ">
            <Header texto={t("Nova Mensagem")} changeLanguage={(e:string) => {i18n.changeLanguage(e);}}/>
            <div className="p-6 ">
                <Responder idMensagem={""} idUsuario={""} idResposta={undefined} />
            </div>
        </div>
    )
    
}

export default NovaMensagem;