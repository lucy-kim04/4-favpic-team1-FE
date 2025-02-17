import clsx from 'clsx';

function Button({
  children,
  intent = 'primary',
  disabled = false,
  size = 'h60',
  className,
  ...props
}) {
  const defaultClassName = clsx(
    `w-full font-bold hover:brightness-90 active:brightness-75 transition`
  );
  const sizeClassName = clsx({
    'h-20 text-2xl': size === 'h80',
    'h-[75px] text-lg': size === 'h75',
    'h-[60px] text-lg': size === 'h60',
    'h-[55px] text-base': size === 'h55',
    'h-10 text-xs': size === 'h40',
  });
  const intentClassName = clsx({
    'bg-[#efff04] text-[#0f0f0f]': intent === 'primary',
    'bg-[#0f0f0f] border border-white hover:brightness-200 active:brightness-75 transition':
      intent === 'secondary',
  });
  const disableClassName = clsx({
    '!bg-[#5a5a5a] !text-[#a4a4a4] hover:!brightness-100 active:!brightness-100 cursor-default':
      disabled,
  });
  return (
    <button
      className={clsx(
        defaultClassName,
        sizeClassName,
        intentClassName,
        disableClassName,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
