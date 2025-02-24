import CardDetailBottom from '../molecules/CardDetailBottom';
import CardDetailTop from '../molecules/CardDetailTop';

/**
 *
 * 카드 상세 옵션
 * - cardDetail : card 상세정보 데이터
 *
 * - topIntent : 카드 상단 형태 구분
 *   - detailAll : 해당 카드의 모든 정보 노출(gallery외의 상세 화면에서 사용)
 *   - myCardDetail : 판매중 나의 카드 상세 정보에서만 사용* , grade,genre,nickname 영역만 노출 - 판매 모달에서 사용
 *   - gallery : 해당 카드의 모든정보 노출 단(기존 잔여에서 보유량으로 변경 됨)
 *
 * - bottomIntent : 카드 하단 형태 구분
 *   - buyer : 구매자가 상점의 카드 상세페이지 조회 시
 *   - seller : 판매자가 상점의 자신의 카드 상세페이지 조회 시
 *   - exchange : 교환 희망 정보 입력 모달(판매할 포토카드 선택 후)
 *   - gallery : 마이 갤러리 카드 상세
 *
 * - dataId : shopID 또는 CardIㅇ
 */
function CardDetail({ cardDetail, topIntent, bottomIntent, dataId }) {
  return (
    <div className="flex justify-center items-center bg-[#0f0f0f] gap-4">
      <div className="w-[440px] md:w-[342px] sm:w-[342px] px-0 py-0">
        <CardDetailTop cardDetail={cardDetail} topIntent={topIntent} />
        <CardDetailBottom
          cardDetail={cardDetail}
          bottomIntent={bottomIntent}
          dataId={dataId}
        />
      </div>
    </div>
  );
}
export default CardDetail;
