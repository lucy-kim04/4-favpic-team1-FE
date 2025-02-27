import PageContainer from '@/components/atoms/PageContainer';
import Detail from '@/components/templates/Detail';

async function ShopDetailPage({ params }) {
  const { shopId } = await params;
  return (
    <PageContainer>
      <div>
        <p className="font-baskinB text-2xl md:text-base text-[#a4a4a4] mb-[60px] md:mb-10 sm:hidden">
          마켓플레이스
        </p>
        <Detail dataId={shopId} intent="market" />
      </div>
    </PageContainer>
  );
}

export default ShopDetailPage;
