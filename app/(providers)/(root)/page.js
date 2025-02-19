import cardsApi from '@/api/cards/cards.api';
import PageContainer from '@/components/atoms/PageContainer';
import CardList from '@/components/organisms/CardList';
import MarketPlaceHeader from '@/components/organisms/MarketPlaceHeader';

async function HomePage() {
  const cards = await cardsApi.getMyCardsOfGallery();

  return (
    <PageContainer>
      {/* client 컴포넌트 */}
      <MarketPlaceHeader />
      <CardList cards={cards} />
    </PageContainer>
  );
}

export default HomePage;
