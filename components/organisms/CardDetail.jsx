import clsx from 'clsx';
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
 * - dataId : shopID 또는 CardID
 *
 * - bgColor : 배경 색
 *   - black(기본값)
 *   - none
 *
 *
 * - givenClassNames : 값을 넘겨주면 기존 CSS 값이 없어지고 내려준 값으로 적용
 */
function CardDetail({
  cardDetail,
  topIntent,
  bottomIntent,
  dataId,
  bgColor = 'black',
  givenClassNames = '',
  ...props
}) {
  const bgColorClassNames = clsx({
    'bg-[#0f0f0f]': bgColor === 'black',
    '': bgColor === 'none',
  });

  const defaultClassNames = clsx({
    'w-[440px] md:w-[342px] sm:w-[342px] px-0 py-0': !givenClassNames,
    '': !!givenClassNames,
  });

  return (
    <div
      className={clsx(
        bgColorClassNames,
        'flex justify-center items-center gap-4'
      )}
    >
      <div className={clsx(defaultClassNames, givenClassNames)}>
        <CardDetailTop cardDetail={cardDetail} topIntent={topIntent} />
        <CardDetailBottom
          cardDetail={cardDetail}
          bottomIntent={bottomIntent}
          dataId={dataId}
          {...props}
        />
      </div>
    </div>
  );
}
export default CardDetail;
