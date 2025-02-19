"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

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
        "relative inline-block",
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
            "absolute left-0 px-[20px] py-[15px] text-white border border-gray-200 whitespace-nowrap gap-[15px] flex flex-col",
            width,
            dropdownClass
          )}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer text-base hover:bg-gray-400 w-full"
              onClick={() => {
                setSelectedOption(option);
                onSelect(option);
                setIsOpen(false);
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
