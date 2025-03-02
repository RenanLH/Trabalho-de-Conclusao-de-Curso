interface TopicoProps{
    title: string;
    user: string;
    text: string;
}

const Topico = ({title, user, text}: TopicoProps) => {
  return (
    <div>
      <div className="m-3 border-2 border-gray-700 rounded">
        <h3 className="m-2">{title}</h3>
        <p className="size-5 ml-3"  >{user}</p>
        <p className="m-3">{text}</p>
      </div>
      <div></div>
    </div>  
  );
};

export default Topico;
