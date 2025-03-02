import { useNavigate } from "react-router-dom";

interface CardProps {
  id: string,
  title: string,
  user: string,
}

const Card = ({ id, title, user}: CardProps) => {
  const navigate = useNavigate();

  function redirectPage() {
    navigate(`/topico/${id}`);
  }

  return (
    <div
      className="border-1 rounded-3xl border-orange-900"
      onClick={redirectPage}
    >
      <h6 className="text-center font-bold m-4">{title}</h6>
      <h6 className="m-2">{user}</h6>
    </div>
  );
};

export default Card;
