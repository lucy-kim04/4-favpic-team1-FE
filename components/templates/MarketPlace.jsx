'use client';

import shopsApi from '@/api/shops/shops.api';
import { useQuery } from '@tanstack/react-query';
import Title from '../molecules/Title';
import CardList from '../organisms/CardList';

function MarketPlace({ initialData }) {
  const searchOptions = {};
  const { data: shops } = useQuery({
    queryKey: ['shops', searchOptions],
    queryFn: () => shopsApi.getShops(),
    initialData,
  });
  return (
    <div>
      {/* <MarketPlaceHeader /> */}
      <div className="mb-[60px] md:mb-10 sm:mb-5">
        <Title
          intent="xl"
          onClick={() => {
            alert('구현중');
          }}
          className="sm:hidden"
        >
          마켓플레이스
        </Title>
        <div></div>
      </div>
      <CardList cards={shops} />
    </div>
  );
}

export default MarketPlace;
