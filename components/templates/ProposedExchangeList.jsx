import shopsApi from '@/api/shops/shops.api';
import { useQuery } from '@tanstack/react-query';
import CardList from '../organisms/CardList';

// 내가 판매하는 카드에 제세된 교환 목록
function ProposedExchangeList({ shopId }) {
  const { data } = useQuery({
    queryKey: ['exchanges', { shopId }],
    queryFn: () => shopsApi.getExchangesOfShop(shopId),
  });

  const exchanges = data || [];
  return (
    <div>
      <CardList intent={'exchange'} cards={exchanges} />
    </div>
  );
}

export default ProposedExchangeList;
