import clsx from 'clsx';

function ExchangeCountChip({ exchangesCount }) {
  const chipClassName = clsx(
    'px-2 lg:px-2 py-1',
    'text-[10px] sm:text-[10px] md:text-sm lg:text-base',
    'font-light rounded-sm bg-black/50',
    'text-white'
  );

  if (exchangesCount)
    return (
      <div className="flex gap-[5px]">
        <span className={chipClassName}>교환 요청 {exchangesCount}</span>
      </div>
    );
}

export default ExchangeCountChip;
