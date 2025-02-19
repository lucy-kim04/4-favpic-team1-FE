import Button from '../atoms/Button';
import Logo from '../atoms/Logo';

function CardBottom({ card, intent }) {
  console.log(card);
  const { price, salesEditionCount, totalEditionCount, proposalContent } = card;
  const isExchange = intent === 'exchange';
  const isShop = intent === 'shop';
  const isGallery = intent === 'gallery';
  const quantityLabel = isShop ? '잔여' : '수량';

  // 교환이 아닐 경우(shop, gallery, sales)
  if (!isExchange)
    return (
      <div>
        <div className="flex justify-between items-center">
          <p className="font-light text-[#a4a4a4] sm:text-[10px]">가격</p>
          <p className="text-lg font-normal sm:text-[10px]">{`${price} P`}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-light text-[#a4a4a4] sm:text-[10px]">
            {quantityLabel}
          </p>
          {isShop ? (
            <div className="flex">
              <p className="font-normal text-lg sm:text-[10px]">{`${salesEditionCount}`}</p>
              <p className="font-light text-[#a4a4a4] text-lg sm:text-[10px]">
                &nbsp;{`/ ${totalEditionCount}`}
              </p>
            </div>
          ) : (
            <p className="font-normal text-lg sm:text-[10px]">
              {isGallery ? card._count.cardEditions : salesEditionCount}
            </p>
          )}
        </div>
        <div className="flex justify-center mt-[30px] mb-[10px] sm:hidden">
          <Logo intent="card" />
        </div>
      </div>
    );

  // 교환일 경우
  return (
    <div>
      <p className="font-normal sm:text-[10px] line-clamp-2">
        {proposalContent}
      </p>
      <div className="flex gap-5 my-10 md:my-6 sm:hidden">
        <Button intent="secondary">거절하기</Button>
        <Button>승인하기</Button>
      </div>
      <div className="flex gap-[5px] mt-5 mb-0 lg:hidden md:hidden">
        <Button intent="secondary" size="h40">
          거절
        </Button>
        <Button size="h40">승인</Button>
      </div>
    </div>
  );
}

export default CardBottom;
