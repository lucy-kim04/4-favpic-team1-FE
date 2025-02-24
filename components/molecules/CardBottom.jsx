import Button from '../atoms/Button';
import Logo from '../atoms/Logo';

function CardBottom({ card, intent, isProposedByMe = false }) {
  const { nickname, price, remainingCount, salesCount, reserveCount, content } =
    card;
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
              <p className="font-normal text-lg sm:text-[10px]">{`${remainingCount}`}</p>
              <p className="font-light text-[#a4a4a4] text-lg sm:text-[10px]">
                &nbsp;{`/ ${salesCount}`}
              </p>
            </div>
          ) : (
            <p className="font-normal text-lg sm:text-[10px]">
              {/* {isGallery ? reserveCount : salesCount} */}
              {isGallery ? reserveCount : remainingCount}
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
      <p className="font-normal sm:text-[10px] line-clamp-2">{content}</p>
      {isProposedByMe ? (
        <div className="mt-10 md:mt-6">
          <Button intent="secondary" className="sm:hidden md:hidden">
            취소하기
          </Button>
          <Button intent="secondary" size="h55" className="sm:hidden lg:hidden">
            취소하기
          </Button>
          <Button intent="secondary" size="h40" className="lg:hidden md:hidden">
            취소하기
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex gap-5 mt-10 md:mt-10-6 sm:hidden">
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
      )}
    </div>
  );
}

export default CardBottom;
