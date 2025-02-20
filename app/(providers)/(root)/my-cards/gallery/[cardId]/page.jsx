import PageContainer from '@/components/atoms/PageContainer';
import MyGalleryCardDetail from '@/components/templates/MyGalleryCardDetail';

async function CardDetailPage({ params }) {
  const cardId = await params;
  return (
    <PageContainer>
      <div>
        <p className="font-baskinB text-2xl text-[#a4a4a4] mb-[60px]">
          마켓플레이스
        </p>
        <MyGalleryCardDetail cardId={cardId} />
      </div>
    </PageContainer>
  );
}

export default CardDetailPage;
