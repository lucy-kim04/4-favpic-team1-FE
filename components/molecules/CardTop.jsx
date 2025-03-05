import soldOut from '@/assets/images/sold-out.png';
import Image from 'next/image';
import ExchangeCountChip from '../atoms/ExchangeCountChip';
import GradeCardBadge from '../atoms/GradeCardBadge';
import SaleStatusChip from '../atoms/SaleStatusChip';

function CardTop({ card, intent }) {
  const {
    imgUrl,
    name,
    grade,
    genre,
    nickname,
    salesCount,
    remainingCount,
    price,
    isWaitingExchange,
    exchangesCount,
  } = card;
  const isGallery = intent === 'gallery';
  const isExchange = intent === 'exchange';
  const isShop = intent === 'shop';
  const isOnSale = remainingCount !== 0;

  return (
    <div className="relative">
      {intent === 'sales' && isOnSale && (
        <div className="absolute flex gap-3 z-20 top-[10px] sm:top-[5px] left-[10px] sm:left-[5px]">
          <SaleStatusChip isSale={!isWaitingExchange} />
          <ExchangeCountChip exchangesCount={exchangesCount} />
        </div>
      )}

      {imgUrl ? (
        <div className="aspect-[4/3] relative mb-6 sm:mb-[10px]">
          <Image
            src={imgUrl}
            alt="카드 이미지"
            fill
            priority
            className={`mb-6 sm:mb-[10px] object-cover ${
              !isOnSale && !isGallery ? ' opacity-30' : ''
            }`}
          />
          {!isOnSale && !isGallery && (
            <Image
              src={soldOut}
              alt="매진"
              className="z-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transform w-[230px] md:w-[200px] sm:w-[112px]"
            />
          )}
        </div>
      ) : (
        <div></div>
      )}
      <p className="text-[22px] sm:text-sm font-bold truncate mb-[10px]">
        {name}
      </p>

      {isExchange ? (
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <GradeCardBadge>{grade}</GradeCardBadge>
              <div className="w-[1px] h-5 sm:h-3 bg-[#5a5a5a] mx-[10px] sm:mx-[5px]"></div>
              <p className="text-[#a4a4a4] sm:text-[10px] font-normal">
                {genre}
              </p>
              <div className="w-[1px] h-5 bg-[#5a5a5a] mx-[10px] sm:mx-[5px] md:hidden sm:hidden"></div>
              <div className="flex md:hidden sm:hidden">
                <p>{price} P</p>
                {/* <p className="text-[#a4a4a4]">&nbsp;에 구매</p> */}
              </div>
            </div>
            <p className="underline font-normal sm:text-[10px] sm:hidden md:hidden">
              {nickname}
            </p>
          </div>
          <div className="flex justify-between lg:hidden">
            <div className="flex">
              <p className="sm:text-[10px]">{price} P</p>
              {/* <p className="text-[#a4a4a4] sm:text-[10px]">&nbsp;에 구매</p> */}
            </div>
            <p className="underline font-normal sm:text-[10px]">{nickname}</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <GradeCardBadge>{grade}</GradeCardBadge>
            <div className="w-[1px] h-5 bg-[#5a5a5a] mx-[10px] sm:mx-[5px]"></div>
            <p className="text-[#a4a4a4] sm:text-[10px] font-normal">{genre}</p>
          </div>
          <p className="underline font-normal sm:text-[10px]">{nickname}</p>
        </div>
      )}
      <div className="h-[1px] bg-[#5a5a5a] my-5 sm:my-[10px]"></div>
    </div>
  );
}

export default CardTop;
