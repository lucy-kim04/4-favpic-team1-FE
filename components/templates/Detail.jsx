'use client';

import cardsApi from '@/api/cards/cards.api';
import shopsApi from '@/api/shops/shops.api';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import GradeCardBadge from '../atoms/GradeCardBadge';
import Title from '../molecules/Title';
import CardDetail from '../organisms/CardDetail';

/**
 * Detail 컴포넌트 설정 방법
 * - intent: gallery(기본값), seller, buyer
 * - dataId: shop 또는 card의 id
 */
function Detail({ dataId, intent = 'gallery' }) {
  const { data } = useQuery({
    queryKey: ['shop', { dataId }],
    queryFn: () => {
      if (intent === 'gallery') return cardsApi.getMyCardOfGallery(dataId);
      return shopsApi.getShop(dataId);
    },
  });

  if (!data) return null;
  console.log(data);
  return (
    <div className={`${intent !== 'gallery'}?mt-[60px]:""`}>
      <Title intent="md">{data.name}</Title>
      <div className="sm:flex justify-center">
        <div className="flex sm:flex-col mt-[60px] md:mt-10 sm:mt-5 items-start sm:w-[345px]">
          <div className="relative w-full aspect-[360/270] mr-20 md:mr-5 sm:mb-5">
            <Image
              src={data.imgUrl}
              alt="상점이미지"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <CardDetail
              cardDetail={data}
              topIntent={'gallery'}
              bottomIntent={intent}
            />
          </div>
        </div>
      </div>
      <div className="mt-[120px]">
        {intent === 'seller' ? (
          <Title intent="md">교환 제시 목록</Title>
        ) : // 응답 목록에 아직 포함되어 있지 않음(2025.02.21)
        intent === 'buyer' ? (
          <div>
            <Title intent="md">교환 희망 정보</Title>
            <p className="mt-[66px] mb-5 text-2xl font-bold">
              {data.exchangeDesc}
            </p>
            <div className="flex gap-3 items-center">
              <GradeCardBadge variant="detail">{data.grade}</GradeCardBadge>
              <div className="w-[2px] h-5 sm:h -3 bg-[#5a5a5a] mx-[10px] sm:mx-[5px]"></div>
              <p className="text-2xl text-[#a4a4a4] sm:text-[10px] font-bold">
                {data.genre}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Detail;
