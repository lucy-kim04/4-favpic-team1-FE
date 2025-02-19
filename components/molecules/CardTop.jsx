import soldOut from '@/assets/images/sold-out.png';
import Image from 'next/image';
import GradeCardBadge from '../atoms/GradeCardBadge';
import SaleStatusChip from '../atoms/SaleStatusChip';

function CardTop({ card, intent }) {
  const {
    seller,
    name,
    grade,
    genre,
    imgUrl,
    salesEditionCount,
    exchangePrice,
  } = card;
  const isGallery = intent === 'gallery';
  const isExchange = intent === 'exchange';
  const isOnSale = salesEditionCount !== 0;

  return (
    <div>
      <div className="relative">
        {intent === 'sales' && isOnSale && (
          <div className="absolute top-[10px]  sm:top-[5px] left-[10px] sm:left-[5px]">
            <SaleStatusChip isSale={false} />
          </div>
        )}
        {!isOnSale && !isGallery && (
          <Image
            src={soldOut}
            alt="매진"
            className="z-10 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transform w-[230px] md:w-[200px] sm:w-[112px]"
          />
        )}
        <Image
          src={imgUrl}
          alt={card}
          width={360}
          height={270}
          className={`mb-6 sm:mb-[10px] ${
            !isOnSale && !isGallery ? ' opacity-30' : ''
          }`}
        />
      </div>
      <p className="text-[22px] sm:text-sm font-bold truncate mb-[10px]">
        {name}
      </p>

      {isExchange ? (
        <div>
          <div className="flex items-center">
            <GradeCardBadge>{grade}</GradeCardBadge>
            <div className="w-[1px] h-5 sm:h-3 bg-[#5a5a5a] mx-[10px] sm:mx-[5px]"></div>
            <p className="text-[#a4a4a4] sm:text-[10px] font-normal">{genre}</p>
            <div className="w-[1px] h-5 bg-[#5a5a5a] mx-[10px] sm:mx-[5px] md:hidden sm:hidden"></div>
            <div className="flex md:hidden sm:hidden">
              <p>{exchangePrice} P</p>
              <p className="text-[#a4a4a4]">&nbsp;에 구매</p>
            </div>
          </div>
          <div className="flex justify-between lg:hidden">
            <div className="flex">
              <p className="sm:text-[10px]">{exchangePrice} P</p>
              <p className="text-[#a4a4a4] sm:text-[10px]">&nbsp;에 구매</p>
            </div>
            <p className="underline font-normal sm:text-[10px]">{seller}</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <GradeCardBadge>{grade}</GradeCardBadge>
            <div className="w-[1px] h-5 bg-[#5a5a5a] mx-[10px] sm:mx-[5px]"></div>
            <p className="text-[#a4a4a4] sm:text-[10px] font-normal">{genre}</p>
          </div>
          <p className="underline font-normal sm:text-[10px]">{seller}</p>
        </div>
      )}
      <div className="h-[1px] bg-[#5a5a5a] my-5 sm:my-[10px]"></div>
    </div>
  );
}

export default CardTop;
