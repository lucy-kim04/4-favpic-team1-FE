import clsx from 'clsx';

/**
 * TitleText 컴포넌트 사용법
 * - children으로 표시할 텍스트를 받습니다
 * - intent에 따라 크기와 글꼴이 정해집니다.
 *   - xl: 마켓플레이스, 포토카드 생성
 *   - lg: 나의 포토카드 판매하기
 *   - md: 교환 희망 정보, {카드명}
 *   - sm: 교환 희망 정보
 *
 * !! 위 예시는 달라질 수 있으니 figma를 참조하여 적용해 주세요.
 */
function TitleText({ children, intent }) {
  const intentClassName = clsx({
    'text-[62px] md:text-[48px] font-baskin': intent === 'xl',
    'text-[46px] md:text-[40px] font-baskin': intent === 'lg',
    'text-[40px] md:text-[32px] sm:text-[24px]': intent === 'md',
    'text-[28px] md:text-[22px]': intent === 'sm',
  });
  return <p className={clsx(intentClassName)}>{children}</p>;
}

export default TitleText;
