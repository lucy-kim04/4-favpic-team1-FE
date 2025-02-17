import CardBottom from '../molecules/CardBottom';
import CardTop from '../molecules/CardTop';

function Card({ card }) {
  const { seller, name, price, grade, genre, imgUrl, description } = card;
  return (
    <div className="h-[100vh] flex justify-center items-center bg-[#0f0f0f]">
      <div className="w-[440px] h-[660px] border border-card-border p-10">
        <CardTop card={card} />
        <CardBottom card={card} />
      </div>
    </div>
  );
}

export default Card;
