import Image from 'next/image';
import Divider from '../atoms/Divider';
import GradeCardBadge from '../atoms/GradeCardBadge';
import Title from '../molecules/Title';

function CardDetailForSale({ card, onBack }) {
  const {
    id,
    imgUrl,
    name,
    grade,
    genre,
    nickname,
    salesCount,
    purchacedPrice,
  } = card;

  return (
    // <div>
    //   <CardDetail cardDetail={card} bottomIntent={'exchange'} dataId={id} />
    // </div>
    <div>
      <h3 className="font-baskin text-[#A4A4A4] text-[24px]">
        나의 포토카드 판매하기
      </h3>
      <Title intent="lg" className={'mt-10 mb-12'}>
        {name}
      </Title>
      <div className="flex gap-10">
        <Image src={imgUrl} width={440} height={330} alt={'카드 이미지'} />
        <div>
          {/* ex) 등급 | 장르  닉네임 */}
          <div className="flex justify-between w-[440px]">
            <div className="flex items-center gap-[15px]">
              <GradeCardBadge variant="detail">{grade}</GradeCardBadge>
              <span>|</span>
              <p className="font-bold text-lg lg:text-2xl text-[#4a4a4a]">
                {genre}
              </p>
            </div>
            <div className="font-bold text-lg lg:text-2xl underline">
              {nickname}
            </div>
          </div>
          <Divider />
          {/* 총 판매 수량 */}
          <div>
            <p>총 판매 수량</p>
          </div>
          {/* 장당 가격 */}
          <div></div>
          {/* 최종 등록가격 */}
        </div>
      </div>
    </div>
  );
}

export default CardDetailForSale;
