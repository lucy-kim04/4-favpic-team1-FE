'use client';

import Button from '../atoms/Button';
import TitleText from '../atoms/TitleText';

/**
 * Title 컴포넌트 사용 방법
 * - children으로 표시할 텍스트를 받습니다.
 * - onClick이 있는 경우 버튼이 표시되고, 버튼명은 children에 의해 자동으로 결정됩니다.
 * - intent에 따라 버튼 크기와 TitleText 크기/글꼴이 결정됩니다.
 *
 * !! 모바일에서 숨겨야할 경우 Title의 className에 sm:hidden을 입력해 주세요.
 */
function Title({ children, intent = 'xl', onClick, className }) {
  const buttonName =
    children === '마켓플레이스'
      ? '내 포토카드 판매하기'
      : children === '마이갤러리'
      ? '포토카드 생성하기'
      : '포토카드 교환하기';
  return (
    <div className={className}>
      <div className="border-b-2 border-[#eeeeee]] pb-4">
        <div className="flex items-center justify-between ">
          <TitleText intent={intent}>{children}</TitleText>
          {onClick && (
            <div className="w-[440px] md:w-[342px]">
              <Button onClick={onClick}>{buttonName}</Button>
            </div>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Title;
