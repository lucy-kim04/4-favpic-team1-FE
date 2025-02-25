import shopsApi from '@/api/shops/shops.api';
import { useQuery } from '@tanstack/react-query';
import Title from '../molecules/Title';
import CardList from '../organisms/CardList';

// 상점의 카드에 내가 제시한 교환 목록
function MyProposeExchangeList({ shopId }) {
  const { data } = useQuery({
    queryKey: ['my-exchanges', { shopId }],
    queryFn: () => shopsApi.getMyExchangesOfShop(shopId),
    staleTime: 0,
  });

  const exchanges = data || [];

  if (exchanges.length === 0) return null;

  return (
    <div className="mt-[120px]">
      <div className="mb-10 lg:mb-[60px]">
        <Title intent="md">내가 제시한 교환 목록</Title>
      </div>
      <CardList intent={'exchange'} cards={exchanges} isProposedByMe={true} />
    </div>
  );
}

export default MyProposeExchangeList;
