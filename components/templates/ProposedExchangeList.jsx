import shopsApi from '@/api/shops/shops.api';
import { useQuery } from '@tanstack/react-query';
import Title from '../molecules/Title';
import CardList from '../organisms/CardList';

// 내가 판매하는 카드에 제시된 교환 목록
function ProposedExchangeList({ shopId }) {
  const { data } = useQuery({
    queryKey: ['exchanges', { shopId }],
    queryFn: () => shopsApi.getExchangesOfShop(shopId),
  });

  const exchanges = data || [];
  if (exchanges.length === 0) return null;
  return (
    <div>
      <div className="mb-10 lg:mb-[60px]">
        <Title intent="md">교환 제시 목록</Title>
      </div>
      <CardList intent={'exchange'} cards={exchanges} />
    </div>
  );
}

export default ProposedExchangeList;
