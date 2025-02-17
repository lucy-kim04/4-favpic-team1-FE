"use client";

import React, { useState, useRef, useEffect } from "react";

function Dropdown({
  options = ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"],
  onSelect = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("등급");
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
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="bg-black text-white border border-white px-4 py-2 text-sm cursor-pointer flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption} <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className="absolute left-0 bg-black text-white border border-gray-400 list-none m-0 w-[167px] gap-4">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-5 py-4 cursor-pointer text-base font-normal hover:bg-gray-500"
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

export default Dropdown;
