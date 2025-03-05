import shopsApi from '@/api/shops/shops.api';
import PageContainer from '@/components/atoms/PageContainer';
import MarketPlace from '@/components/templates/MarketPlace';

async function HomePage() {
  const shops = await shopsApi.getShops({
    orderBy: '최신 순',
    grade: '등급',
    genre: '장르',
    onSale: '판매 여부',
    keyword: '',
    limit: 9,
    skip: 0,
  });

  return (
    <PageContainer>
      {/* client 컴포넌트 */}
      <MarketPlace initialData={shops} />
    </PageContainer>
  );
}

export default HomePage;
