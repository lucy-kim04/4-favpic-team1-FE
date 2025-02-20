"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function Dropdown({
  width = "",
  label = "선택",
  options = [],
  onSelect = () => {},
  buttonClass = "",
  dropdownClass = "",
  isBox = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(label);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={clsx(
        "relative inline-block z-10",
        isBox && "border border-gray-200 px-[20px] w-[180px] box-border"
      )}
      ref={dropdownRef}
    >
      <button
        className={clsx(
          "text-white text-[18px] py-[18px] text-base cursor-pointer flex items-center",
          width,
          isBox ? "gap-[38px]" : "gap-[15px]",

          buttonClass
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}{" "}
        <span className="text-[8.4px]">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul
          className={clsx(
            "bg-[#0f0f0f] absolute left-0 px-[20px] py-[15px] text-white border border-gray-200 whitespace-nowrap gap-[15px] flex flex-col",
            width,
            dropdownClass
          )}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer text-base hover:bg-gray-400 w-full"
              onClick={() => {
                setSelectedOption((prev) => {
                  setSelectedOption((prev) =>
                    prev === option ? label : option
                  );
                  setIsOpen(false);
                });
              }}
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
width="w-[134px]"
label="등급"
options={["COMMON", "RARE", "SUPER RARE", "LEGENDARY"]}
onSelect={(value) => console.log(value)}
/>
<Dropdown
width="w-[134px]"
label="장르"
options={["여행", "풍경", "인물", "사물"]}
onSelect={(value) => console.log(value)}
/>
<Dropdown
width="w-[160px]"
label="판매방법"
options={["교환 제시 대기 중", "판매중"]}
onSelect={(value) => console.log(value)}
/>
<Dropdown
width="w-[140px]"
label="매진 여부"
options={["판매 중", "판매 완료"]}
onSelect={(value) => console.log(value)}
/>
<Dropdown
width="w-[180px]"
label="낮은 가격순"
options={["최신 순", "오래된 순", "높은 가격순", "낮은 가격순"]}
onSelect={(value) => console.log(value)}
isBox={true}
/>*/
}
