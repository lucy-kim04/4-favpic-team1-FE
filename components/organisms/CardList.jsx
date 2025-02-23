import clsx from 'clsx';
import Card from './Card';

/**
 *  - colNum : (default=3) 기본으로 시작하는 카드의 열 개수 입니다.
 *  '나의 포토카드 판매하기' 모달에서 디자인 적용을 위해 옵션을 추가했습니다.
 */

function CardList({ cards, intent, colNum = 3 }) {
  const colNumClassNames = clsx({
    'gap-20 md:gap-5 sm:gap-4 grid-cols-3 md:grid-cols-2 sm:grid-cols-2':
      colNum === 3,
    'gap-10 grid-cols-2': colNum === 2,
  });

  return (
    <div className="flex justify-center">
      <div className={clsx(colNumClassNames, 'w-full grid')}>
        {cards.map((card) => (
          <Card key={card.id} intent={intent} card={card} />
        ))}
      </div>
    </div>
  );
}

export default CardList;
