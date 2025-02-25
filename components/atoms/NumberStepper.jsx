'use client';

import clsx from 'clsx';

const NumberStepper = ({ value = 0, onChange, maxCount, ...props }) => {
  const handleIncrement = () => {
    if (value < maxCount) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const container = clsx(
    'w-[144px] lg:w-[176px]',
    'h-[45px] lg:h-[50px]',
    'flex justify-between items-center gap-2',
    'border border-white rounded-sm'
  );

  const button = clsx('p-5', 'text-lg lg:text-2xl');

  return (
    <div className={container}>
      <button type="button" onClick={handleDecrement} className={button}>
        -
      </button>
      <div className="items-center">{value}</div>
      <button type="button" onClick={handleIncrement} className={button}>
        +
      </button>
    </div>
  );
};

export default NumberStepper;
