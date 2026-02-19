const formatDate = (date: string) => {

    const dataF = new Date(date);

    const dia = dataF.getDate() < 10 ? "0" + dataF.getDate() : dataF.getDate();
    const mes = dataF.getMonth() < 10 ? "0" + (dataF.getMonth() + 1) : (dataF.getMonth() + 1); // getMonth começa em 0 :)

    const language = localStorage.getItem("language");
    let returnDate = `${dia}/${mes}/${dataF.getFullYear()}`;

    if (language && language === "en") {
        returnDate = `${mes}/${dia}/${dataF.getFullYear()}`;
    }

    console.log(returnDate);

    return returnDate;
}

const isLogged = () => {
    const token = localStorage.getItem("token");
    const idUsuario = localStorage.getItem("idUsuario");
    const validToken = token ? (token.length >= 16) && validHex(token) : false;
    const validId = idUsuario ? (idUsuario.length >= 16) && validHex(idUsuario) : false

    return validToken && validId;

}

const isAdmin = () => {

    const token = localStorage.getItem("token");

    return token != null && isLogged() && token.includes("8354c67bf5dab839");

}

const validHex = (str: string) => {
    const regex = new RegExp("^[0-9a-f]+$");
    return regex.test(str);
}

const role = {
    ADMIN: 'admin',
    USER: 'user',
}

const statusMensagem = {
    "F": "Finalizada",
    "R": "Respondida",
    "NR": "Nao Respondida",
}


export { formatDate, isLogged, isAdmin, role, statusMensagem }


