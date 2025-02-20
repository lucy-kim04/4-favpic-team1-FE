import cardsApi from '@/api/cards/cards.api';
import PageContainer from '@/components/atoms/PageContainer';
import MyGallery from '@/components/templates/MyGallery';

async function MyCardsGalleryPage() {
  const cards = await cardsApi.getMyCardsOfGallery();
  return (
    <PageContainer>
      {/* client 컴포넌트 */}
      <MyGallery cards={cards} />
    </PageContainer>
  );
}

export default MyCardsGalleryPage;
