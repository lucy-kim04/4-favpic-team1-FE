import Card from './Card';

function CardList({ cards }) {
  return (
    <div className="flex justify-center">
      <div className="grid gap-20 md:gap-5 sm:gap-4 grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
        {cards.map((card) => (
          <Card key={card.id} intent="gallery" card={card} />
        ))}
      </div>
    </div>
  );
}

export default CardList;
