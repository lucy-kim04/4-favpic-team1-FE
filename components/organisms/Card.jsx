import CardBottom from '../molecules/CardBottom';
import CardTop from '../molecules/CardTop';

/**
 * 카드 컴포넌트 옵션
 * - card: card 데이터
 * - intent: 카드의 형태 구분
 *   - shop(기본값): 마켓 플레이스 목록
 *   - gallery: /my-cards/gallery의 목록
 *   - sales: /my-cards/sales의 목록
 *   - exchange: 판매포토 카드 상세(판매자) 페이지의 하단 '교환 제시 목록'
 */

function Card({ card, intent = 'shop', ...props }) {
  const handleClickCard = () => {
    const isPossibleClick = !!props.onCardClick;
    if (!isPossibleClick) return;
    props.onCardClick(card, intent);
  };
  const cursorClassName = `${props.onCardClick ? 'cursor-pointer' : ''}`;
  const hoverClassName = `${
    props.onCardClick
      ? 'hover:brightness-75 hover:shadow-card hover:border-[#6c6b6b] active:brightness-75'
      : ''
  }`;
  return (
    <div
      onClick={handleClickCard}
      className={`border border-card ring-white p-10 md:p-5 sm:p-[10px] ${hoverClassName} ${cursorClassName}`}
    >
      <CardTop card={card} intent={intent} />
      <CardBottom
        card={card}
        intent={intent}
        isProposedByMe={props.isProposedByMe}
      />
    </div>
  );
}

export default Card;
