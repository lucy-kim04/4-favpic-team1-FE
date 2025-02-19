import cardsApi from '@/api/cards/cards.api';
import PageContainer from '@/components/atoms/PageContainer';
import CardList from '@/components/organisms/CardList';
import MyGalleryHeader from '@/components/organisms/MyGalleryHeader';

async function MyCardsGalleryPage() {
  const cards = await cardsApi.getMyCardsOfGallery();
  return (
    <PageContainer>
      {/* client 컴포넌트 */}
      <MyGalleryHeader />
      <CardList cards={cards} />
    </PageContainer>
  );
}

export default MyCardsGalleryPage;
