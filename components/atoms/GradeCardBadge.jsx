'use client';
import clsx from 'clsx';

function GradeCardBadge({
  children,
  variant = 'default',
  className,
  ...props
}) {
  const gradeClassName = clsx(
    {
      // 카드에서 사용되는용
      'text-xs lg:text-base font-light': variant === 'default',

      // 디테일에서 사용되는용
      'text-lg lg:text-2xl font-bold': variant === 'detail',

      // 등급별 색상
      'text-[#EFFF04]': children === 'COMMON',
      'text-[#29C9F9]': children === 'RARE',
      'text-[#A77EFF]': children === 'SUPER RARE',
      'text-[#FF2A6A]': children === 'LEGENDARY',
    },
    className
  );

  return (
    <span className={gradeClassName} {...props}>
      {children}
    </span>
  );
}

export default GradeCardBadge;
