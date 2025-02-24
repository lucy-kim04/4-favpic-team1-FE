"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

export default function FilterModal({ filters, onSelect, onClose }) {
  const [selectedTab, setSelectedTab] = useState("등급");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const modalRef = useRef(null);

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter.label);
    onSelect(filter.label);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-[#1B1B1B] text-white w-[375px] h-[480px] rounded-lg overflow-hidden"
      >
        <div className="flex justify-between items-center p-4">
          <span className="absolute left-1/2 transform -translate-x-1/2 text-gray-400">
            필터
          </span>
          <button onClick={onClose} className="ml-auto text-gray-400 text-lg">
            &times;
          </button>
        </div>

        <div className="flex">
          {Object.keys(filters).map((category) => (
            <button
              key={category}
              className={clsx(
                "flex-1 py-3 text-center",
                selectedTab === category
                  ? "text-white border-b-2 border-white"
                  : "text-gray-400"
              )}
              onClick={() => setSelectedTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <ul className="p-4">
          {filters[selectedTab]?.map((filter) => (
            <li
              key={filter.label}
              className={clsx(
                "flex justify-between items-center py-2 px-3 cursor-pointer",
                "hover:bg-gray-700",
                selectedFilter === filter.label && "bg-[#161616]"
              )}
              onClick={() => handleFilterSelect(filter)}
            >
              <span className={clsx(filter.color, "font-bold")}>
                {filter.label}
              </span>
              <span
                className={clsx(
                  selectedFilter === filter.label
                    ? "text-gray-100"
                    : "text-gray-300"
                )}
              >
                {filter.count}개
              </span>
            </li>
          ))}
        </ul>

        <div className="p-4 flex items-center gap-[10px] justify-between">
          <button
            onClick={() => setSelectedFilter(null)}
            className="text-gray-400 text-2xl"
          >
            ↻
          </button>
          <button className="bg-[#EFFF04] text-black font-bold py-3 px-5 rounded-[2px] flex-1">
            {selectedFilter
              ? `${
                  filters[selectedTab]?.find((f) => f.label === selectedFilter)
                    ?.count
                }개 포토보기`
              : "포토보기"}
          </button>
        </div>
      </div>
    </div>
  );
}
