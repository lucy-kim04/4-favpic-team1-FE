'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

export default function Dropdown({
  label = '선택',
  options = [],
  onSelect = () => {},
  buttonClass = '',
  dropdownClass = '',
  isBox = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const handleClick = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
      onSelect(label);
    } else {
      setSelectedOption(option);
      onSelect(option);
    }
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={clsx(
        'relative inline-block z-[999]',
        isBox &&
          'border border-gray-200 w-[135px] md:w-[140px] lg:w-[180px] box-border py-[7.5px] md:py-[11.5px] lg:py-[13px] px-[15px] md:px-[15px] lg:px-5'
      )}
      ref={dropdownRef}
    >
      <button
        className={clsx(
          'text-gray-200 text-xs md:text-sm lg:text-base font-bold cursor-pointer flex justify-between items-center w-full',
          isBox ? '' : 'gap-[10px]',

          buttonClass
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <span className='w-6 h-6 text-[8.4px] flex items-center justify-center'>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>
      {isOpen && (
        <ul
          className={clsx(
            'bg-[#0f0f0f] absolute left-0 px-[20px] py-[15px] text-white border border-gray-200 whitespace-nowrap gap-[15px] flex flex-col',
            isBox && 'w-[135px] md:w-[140px] lg:w-[180px] box-border top-14',
            dropdownClass
          )}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={clsx(
                'cursor-pointer text-xs md:text-sm lg:text-base hover:bg-gray-400',

                selectedOption === option && 'bg-gray-600 w-full'
              )}
              onClick={() => handleClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

{
  /*
<Dropdown
label="등급"
options={["COMMON", "RARE", "SUPER RARE", "LEGENDARY"]}
onSelect={(value) => console.log(value)}
/>
<Dropdown
label="장르"
options={["여행", "풍경", "인물", "사물"]}
onSelect={(value) => console.log(value)}
/>
<Dropdown
label="판매방법"
options={["교환 제시 대기 중", "판매중"]}
onSelect={(value) => console.log(value)}
/>
<Dropdown
label="매진 여부"
options={["판매 중", "판매 완료"]}
onSelect={(value) => console.log(value)}
/>
<Dropdown
label="낮은 가격순"
options={["최신 순", "오래된 순", "높은 가격순", "낮은 가격순"]}
onSelect={(value) => console.log(value)}
isBox={true}
/>*/
}
