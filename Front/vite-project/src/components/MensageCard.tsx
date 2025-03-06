import { useNavigate } from "react-router-dom";

interface MensagemCardProps {
  id: string,
  content: string,
  user: string,
  data: string,
}

const Card = ({ id, content, user,data}: MensagemCardProps) => {
  const navigate = useNavigate();

  function redirectPage() {
    navigate(`/mensagem/${id}`);
  }

  return (
    <div
      className="border-1 rounded-3xl border-orange-900"
      onClick={redirectPage}>     
        <h6 className="text-center p-2">{user} - {data}</h6>
        <h6 className="text-center font-bold ml-3 mr-3 mb-3">{content}</h6>
    </div>
  );
};

export default Card;
