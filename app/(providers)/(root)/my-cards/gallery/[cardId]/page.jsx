import PageContainer from '@/components/atoms/PageContainer';
import Detail from '@/components/templates/Detail';

async function CardDetailPage({ params }) {
  const { cardId } = await params;
  return (
    <PageContainer>
      <div>
        <Detail dataId={cardId} />
      </div>
    </PageContainer>
  );
}

export default CardDetailPage;
