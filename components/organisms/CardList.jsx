import Card from './Card';

/**
 * 카드 컴포넌트 옵션
 * - card: card 데이터
 * - intent: 카드의 형태 구분
 *   - shop(기본값): 마켓 플레이스 목록
 *   - gallery: /my-cards/gallery의 목록
 *   - sales: /my-cards/sales의 목록
 *   - exchange: 판매포토 카드 상세(판매자) 페이지의 하단 '교환 제시 목록'
 */
function CardList({ cards, intent }) {
  return (
    <div className="flex justify-center">
      <div className="w-full grid gap-20 md:gap-5 sm:gap-4 grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
        {cards.map((card) => (
          <Card key={card.id} intent={intent} card={card} />
        ))}
      </div>
    </div>
  );
}

export default CardList;
