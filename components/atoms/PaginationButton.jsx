import arrowLeftWhite from '@/assets/images/arrow-left-white.png';
import arrowLeft from '@/assets/images/arrow-left.png';
import Image from 'next/image';

function PaginationButton({
  arrowDirection,
  index,
  currentPage,
  onClick,
  isDisableLeft,
  isDisableRight,
}) {
  const handleClick = () => {
    if (arrowDirection) {
      // 2. 화살표인 경우
      onClick(index);
    } else {
      // 2. 화살표가 아닌 경우(숫자인 경우)
      onClick(index);
    }
  };

  const isDisableArrow =
    (isDisableLeft && arrowDirection === 'previous') ||
    (isDisableRight && arrowDirection === 'next');

  if (arrowDirection) {
    const arrowClassName = `w-11 h-11 bg-[#0f0f0f] border ${
      isDisableArrow ? ' border-[#6e6e6e]' : ''
    } rounded-lg flex justify-center items-center font-semibold mr-2 ${
      isDisableArrow ? '' : 'cursor-pointer'
    } ${arrowDirection === 'previous' ? '' : 'transform rotate-180'}`;

    return (
      <div className={arrowClassName} onClick={handleClick}>
        <Image
          src={isDisableArrow ? arrowLeft : arrowLeftWhite}
          alt={arrowDirection}
          className="w-4"
        />
      </div>
    );
  } else {
    const className =
      index === currentPage
        ? 'w-11 h-11 bg-[#efff04] rounded-lg flex justify-center items-center text-[#0f0f0f] font-semibold mr-2 cursor-pointer'
        : 'w-11 h-11 bg-[#0f0f0f] border rounded-lg flex justify-center items-center font-semibold mr-2 cursor-pointer';
    return (
      <div className={className} onClick={handleClick}>
        {index}
      </div>
    );
  }
}

export default PaginationButton;
