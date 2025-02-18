"use client";

import React, { useState, useRef, useEffect } from "react";

export function DropdownGrade({
  options = ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"],
  onSelect = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("등급w");
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
        className=" text-white py-[18px]  text-base cursor-pointer flex items-center gap-2.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption} <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className="absolute left-0 px-[15px] py-[20px] text-white border border-gray-200 w-[134px] flex flex-col gap-[15px]">
          {options.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer text-base hover:bg-gray-400"
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

export function DropdownGenre({
  options = ["여행", "풍경", "인물", "사물"],
  onSelect = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("장르");
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
        className=" text-white py-[18px]  text-base cursor-pointer flex items-center gap-2.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption} <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className="absolute left-0 px-[15px] py-[20px] text-white border border-gray-200 w-[134px] flex flex-col gap-[15px]">
          {options.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer text-base hover:bg-gray-400"
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

export function DropdownMethod({
  options = ["교환 제시 대기 중", "판매중"],
  onSelect = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("판매방법");
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
        className=" text-white py-[18px]  text-base cursor-pointer flex items-center gap-2.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption} <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className="absolute left-0 px-[15px] py-[20px] text-white border border-gray-200 w-[154px] flex flex-col gap-[15px]">
          {options.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer text-base hover:bg-gray-400"
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

export function DropdownStatus({
  options = ["판매 중", "판매 완료"],
  onSelect = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("매진 여부");
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
        className=" text-white py-[18px]  text-base cursor-pointer flex items-center gap-2.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption} <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className="absolute left-0 px-[15px] py-[20px] text-white border border-gray-200 w-[154px] flex flex-col gap-[15px]">
          {options.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer text-base hover:bg-gray-400"
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

export function DropdownPrice({
  options = ["최신 순", "오래된 순", "높은 가격순", "낮은 가격순"],
  onSelect = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("낮은 가격순");
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
        className="bg-black text-white border border-gray-200 px-5 py-[13px] w-[180px] text-base cursor-pointer flex items-center gap-[38px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption} <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className="absolute left-0 px-[15px] py-[20px] text-white border border-gray-200 w-[180px] flex flex-col gap-[15px]">
          {options.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer text-base hover:bg-gray-400"
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
