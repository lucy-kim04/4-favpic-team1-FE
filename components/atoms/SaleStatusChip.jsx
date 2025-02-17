'use client';
import clsx from 'clsx';

function SaleStatusChip({ isSale }) {
  const chipClassName = clsx(
    'px-2 lg:px-2 py-1',
    'text-[10px] sm:text-[10px] md:text-sm lg:text-base',
    'font-light rounded-sm bg-black/50',
    {
      'text-white': isSale,
      'text-[#EFFF04]': !isSale,
    }
  );

  return (
    <div className='flex gap-[5px]'>
      <span className={chipClassName}>
        {isSale ? '판매중' : '교환 제시 대기 중'}
      </span>
    </div>
  );
}

export default SaleStatusChip;
