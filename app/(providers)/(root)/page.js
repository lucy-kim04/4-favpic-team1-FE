import shopsApi from '@/api/shops/shops.api';
import PageContainer from '@/components/atoms/PageContainer';
import MarketPlace from '@/components/templates/MarketPlace';

async function HomePage() {
  const shops = await shopsApi.getShops();

  return (
    <PageContainer>
      {/* client 컴포넌트 */}
      <MarketPlace initialData={shops} />
    </PageContainer>
  );
}

export default HomePage;
