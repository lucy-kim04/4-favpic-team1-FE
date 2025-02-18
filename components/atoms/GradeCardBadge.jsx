'use client';
import clsx from 'clsx';

function GradeCardBadge({
  children,
  variant = 'default',
  className,
  ...props
}) {
  const variantClassName = clsx({
    'text-[10px] md:text-base lg:text-base font-light': variant === 'default',
    'text-lg lg:text-2xl font-bold': variant === 'detail',
  });

  const gradeClassName = clsx({
    'text-[#EFFF04]': children === 'COMMON',
    'text-[#29C9F9]': children === 'RARE',
    'text-[#A77EFF]': children === 'SUPER RARE',
    'text-[#FF2A6A]': children === 'LEGENDARY',
  });

  return (
    <span
      className={clsx(variantClassName, gradeClassName, className)}
      {...props}
    >
      {children}
    </span>
  );
}

export default GradeCardBadge;
