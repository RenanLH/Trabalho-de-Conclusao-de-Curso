interface RespostaProps{
    user: string;
    text: string;
}

const Resposta = ({user, text}: RespostaProps) => {
  return (
    <div>
      <div className="ml-4 mr-4 mb-2 border-2 border-cyan-800 rounded">
        <p className="mt-2 p-2">{user}</p>
        <p className="m-3">{text}</p>
      </div>
      <div></div>
    </div>  
  );
};

export default Resposta;
