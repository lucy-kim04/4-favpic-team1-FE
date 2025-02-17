import clsx from 'clsx';

/**
 * Button 컴포넌트 사용 방법
 *
 * 1. intent에 따라 배경색이 변경됩니다. (primary, secondary)
 *   - 기본값은 primary 노란색이고, secondary는 disabled가 없습니다.
 * 2. 버튼 사이즈가 다양해서 width는 full로 하여 부모의 크기를 따라 가도록 합니다.
 *   - h80, h75, h60, h55, h40
 *   - 텍스트 사이즈는 버튼 사이즈에 의해 결정됩니다.
 * 3. onClick, onChange 등의 이벤트는 기존 button tag처럼 적어주시면 됩니다.
 */
function Button({
  type = 'submit',
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
      type={type}
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
