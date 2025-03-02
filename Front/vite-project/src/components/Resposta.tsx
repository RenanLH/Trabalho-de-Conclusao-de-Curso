interface RespostaProps{
    user: string;
    text: string;
}

const Resposta = ({user, text}: RespostaProps) => {
  return (
    <div>
      <div className="ml-3 mr-3 mb-2 border-2 border-x-cyan-900 rounded">
        <p className="size-5 ml-3">{user}</p>
        <p className="m-3">{text}</p>
      </div>
      <div></div>
    </div>  
  );
};

export default Resposta;
