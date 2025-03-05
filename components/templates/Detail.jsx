'use client';

import cardsApi from '@/api/cards/cards.api';
import shopsApi from '@/api/shops/shops.api';
import usersApi from '@/api/users/users.api';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import GradeCardBadge from '../atoms/GradeCardBadge';
import Title from '../molecules/Title';
import CardDetail from '../organisms/CardDetail';
import MyProposeExchangeList from './MyProposeExchangeList';
import ProposedExchangeList from './ProposedExchangeList';

/**
 * Detail 컴포넌트 설정 방법
 * - intent: gallery(마이갤러리에서 상세 조회), shop(마켓플레이스에서 상세 조회)
 * - dataId: shop 또는 card의 id
 */
function Detail({ dataId, intent = 'gallery' }) {
  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: usersApi.getMe,
  });
  const currentUser = user?.nickname || '';
  const { data } = useQuery({
    queryKey: [intent, { dataId }],
    queryFn: () => {
      if (intent === 'gallery') return cardsApi.getMyCardOfGallery(dataId);
      return shopsApi.getShop(dataId);
    },
  });

  if (!data) return null;

  return (
    <div className={`${intent !== 'gallery'}?mt-[60px]:""`}>
      <Title intent="md">{data.name}</Title>
      <div className="sm:flex justify-center">
        <div className="flex sm:flex-col mt-[60px] md:mt-10 sm:mt-5 items-start sm:w-[345px]">
          <div className="relative w-full aspect-[4/3] mr-20 md:mr-5 sm:mb-5">
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
              topIntent={intent === 'gallery' ? 'gallery' : 'detailAll'}
              bottomIntent={
                intent === 'gallery'
                  ? intent
                  : currentUser === data.seller
                  ? 'seller'
                  : 'buyer'
              }
              dataId={dataId}
            />
          </div>
        </div>
      </div>
      <div className="mt-[120px]">
        {intent !== 'gallery' && currentUser === data.seller ? (
          <ProposedExchangeList shopId={dataId} />
        ) : // 응답 목록에 아직 포함되어 있지 않음(2025.02.21)
        intent !== 'gallery' && currentUser !== data.seller ? (
          <div>
            <div>
              <Title intent="md">교환 희망 정보</Title>
              <p className="mt-[66px] mb-5 text-2xl font-bold">
                {data.exchangeDesc}
              </p>
              <div className="flex gap-3 items-center">
                <GradeCardBadge variant="detail">
                  {data.exchangeGrade}
                </GradeCardBadge>
                <div className="w-[2px] h-5 sm:h -3 bg-[#5a5a5a] mx-[10px] sm:mx-[5px]"></div>
                <p className="font-bold text-lg lg:text-2xl text-[#a4a4a4]">
                  {data.exchangeGenre}
                </p>
              </div>
            </div>
            <MyProposeExchangeList shopId={dataId} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Detail;
