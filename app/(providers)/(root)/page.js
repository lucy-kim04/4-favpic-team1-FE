import Title from '@/components/molecules/Title';

const { default: PageContainer } = require('@/components/atoms/PageContainer');

function HomePage() {
  return (
    <PageContainer>
      <Title intent="xl" onClick={() => {}} className="sm:hidden">
        마켓플레이스
      </Title>
    </PageContainer>
  );
}

export default HomePage;
