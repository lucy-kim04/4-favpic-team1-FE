import React from 'react';

function CardDetailForSale({ card, onBack }) {
  const { imgUrl, name, grade, genre, nickname, salesCount, purchacedPrice } =
    card;

  return <div>CardDetailForSale{name}</div>;
}

export default CardDetailForSale;
