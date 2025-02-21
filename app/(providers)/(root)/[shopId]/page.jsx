import PageContainer from '@/components/atoms/PageContainer';
import Detail from '@/components/templates/Detail';

async function ShopDetailPage({ params }) {
  const { shopId } = await params;
  console.log(shopId);
  return (
    <PageContainer>
      <div>
        <p className="font-baskinB text-2xl text-[#a4a4a4] mb-[60px]">
          마켓플레이스
        </p>
        <Detail dataId={shopId} intent="seller" />
      </div>
    </PageContainer>
  );
}

export default ShopDetailPage;
