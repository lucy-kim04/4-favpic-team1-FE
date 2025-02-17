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
function Card({ card, intent = 'shop' }) {
  return (
    <div className="h-[100vh] flex justify-center items-center bg-[#0f0f0f]">
      <div className="w-[440px] md:w-[342px] sm:w-[170px] border border-card-border p-10 md:p-5 sm:p-[10px]">
        <CardTop card={card} intent={intent} />
        <CardBottom card={card} intent={intent} />
      </div>
    </div>
  );
}

export default Card;
