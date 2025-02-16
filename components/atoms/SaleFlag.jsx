'use client';
/**
 *
 * props = {true} or {false} 로 처리
 * 두 가지 모두 일 경우 각각 false 값 전달
 * 판매중: saleStatus
 * 교환 제시 대기 중: exchangeSta tus
 *
 */
function SaleFlag({ saleStatus, exchangeStatus }) {
  const renderFlags = () => {
    return (
      <div className='flex gap-[5px]'>
        {saleStatus && (
          <span className='px-[8px] lg:px-2 py-[4px] text-[10px] sm:text-[10px] md:text-[14px] lg:text-[16px] font-semibold text-white bg-black/50 rounded-sm'>
            판매중
          </span>
        )}
        {exchangeStatus && (
          <span className='px-[8px] lg:px-2 py-[4px] text-[10px] sm:text-[10px] md:text-[14px] lg:text-[16px] font-semibold text-[#EFFF04] bg-black/50 rounded-sm'>
            교환 제시 대기 중
          </span>
        )}
      </div>
    );
  };

  return renderFlags();
}

export default SaleFlag;
