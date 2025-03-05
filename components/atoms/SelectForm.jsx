import clsx from 'clsx';
import icDown from '@/assets/images/ic-down.png';
import { useState } from 'react';

// boxSize => sm: 345x55 / md: 440x55 / lg:520x60
// name = "genre"
// options = [ {name: "여행", value: "travel"}, {name: "풍경", value: "landscape"} ]

function SelectForm({
  id,
  name,
  placeholder,
  size = 'lg',
  error = false,
  options,
  onChange,
  value,
  ...props
}) {
  const widthClassNames = clsx({
    'w-[345px]': size === 'sm',
    'w-[440px]': size === 'md',
    'w-[520px]': size === 'lg',
  });

  const hieghtClassNames = clsx({
    'h-[55px]': size === 'sm',
    'h-[55px]': size === 'md',
    'h-[60px]': size === 'lg',
  });

  const errorBorderClassNames = clsx({
    'border-[#ff483d]': error === true,
    'border-gray-200': error === false,
  });

  const defaultClassNames = clsx({
    'md:w-full sm:w-full relative cursor-pointer': true,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleBlur = (e) => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const selectedOption = options.find((option) => option.value === value);

  const handleOptionClick = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div
      tabIndex={0}
      onBlur={handleBlur}
      className={clsx(widthClassNames, hieghtClassNames, defaultClassNames)}
    >
      {/* hidden select는 폼 제출 및 접근성을 위한 역할 */}
      <select
        id={id}
        name={name}
        className="hidden"
        value={value}
        onChange={() => {}}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>

      {/* 커스텀 UI */}
      <div
        className={clsx(
          errorBorderClassNames,
          'flex items-center py-[20px] px-[18px] border'
        )}
        style={{
          backgroundImage: `url(${icDown.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'calc(100% - 15px) center',
          backgroundSize: '1.5rem',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {}
        {selectedOption ? (
          selectedOption.label
        ) : (
          <small className="font-thin text-base text-gray-200">
            {placeholder}
          </small>
        )}
      </div>
      {isOpen && (
        <div
          className={clsx(
            'absolute bg-black flex flex-col gap-5 border mt-1 py-[20px] px-[18px] z-10 w-full'
          )}
        >
          {options.map((option, index) => (
            <div key={index} onClick={() => handleOptionClick(option)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectForm;
