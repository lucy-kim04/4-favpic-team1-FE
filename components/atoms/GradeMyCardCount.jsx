'use client';
import clsx from 'clsx';

function GradeMyCardCount({
  gradeCard,
  count,
  variant = 'default',
  className,
  ...props
}) {
  const gradeClassName = clsx(
    {
      // 기본 스타일
      'px-[10px] lg:px-4 py-[6px] lg:py-2 rounded-none flex gap-1 w-fit bg-[#0F0F0F] border': true,

      // 카드 레벨별 색상과 보더
      'text-[#EFFF04] border-[#EFFF04]': gradeCard === 'COMMON',
      'text-[#29C9F9] border-[#29C9F9]': gradeCard === 'RARE',
      'text-[#A77EFF] border-[#A77EFF]': gradeCard === 'SUPER RARE',
      'text-[#FF2A6A] border-[#FF2A6A]': gradeCard === 'LEGENDARY',
    },
    className
  );

  const textClassName = 'text-xs sm:text-xs md:text-sm lg:text-base font-light';

  return (
    <div className={gradeClassName} {...props}>
      <span className={textClassName}>{gradeCard}</span>
      <span className={textClassName}>{count}장</span>
    </div>
  );
}

export default GradeMyCardCount;
