import PageContainer from '@/components/atoms/PageContainer';
import ShopDetail from '@/components/templates/ShopDetail';

async function ShopDetailPage({ params }) {
  const { shopId } = await params;
  return (
    <PageContainer>
      <div>
        <p className="font-baskinB text-2xl text-[#a4a4a4] mb-[60px]">
          마켓플레이스
        </p>
        <ShopDetail shopId={shopId} />
      </div>
    </PageContainer>
  );
}

export default ShopDetailPage;
