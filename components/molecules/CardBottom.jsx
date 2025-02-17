function CardBottom({ card }) {
  const { seller, name, price, grade, genre, imgUrl, description } = card;

  return (
    <div>
      <div className="flex justify-between">
        <p className="font-light text-[#a4a4a4]">가격</p>
        <p>{`${price} P`}</p>
      </div>
      <div className="flex justify-between">
        <p className="font-light text-[#a4a4a4]">잔여</p>
        <p>{`${price} P`}</p>
      </div>
    </div>
  );
}

export default CardBottom;
