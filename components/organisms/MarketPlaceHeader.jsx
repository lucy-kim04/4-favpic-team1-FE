'use client';

import Title from '../molecules/Title';

function MarketPlaceHeader() {
  return (
    <div className="mb-[60px] md:mb-10 sm:mb-5">
      <Title
        intent="xl"
        onClick={() => {
          alert('구현중');
        }}
        className="sm:hidden"
      >
        마켓플레이스
      </Title>
    </div>
  );
}

export default MarketPlaceHeader;
