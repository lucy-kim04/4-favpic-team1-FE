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
    <div className="fixed inset-0 flex bg-black bg-opacity-50">
      <div className="">
        {/* 필터 제목 & 닫기 버튼 */}
        <div className="flex justify-between items-center p-4">
          <span className="text-gray-400 items-center text-lg">필터</span>
          <button onClick={onClose} className="text-gray-400 text-lg">
            &times;
          </button>
        </div>

        <div className="flex">
          {["등급", "장르", "매진 여부"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 text-center ${
                selectedTab === tab
                  ? "text-white border-b-2 border-white"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <ul className="p-4">
          {filters[selectedTab]?.map((filter) => (
            <li
              key={filter.label}
              className="flex justify-between items-center py-2 px-3 cursor-pointer hover:bg-gray-700"
              onClick={() => handleFilterSelect(filter)}
            >
              <span className={`font-bold ${filter.color}`}>
                {filter.label}
              </span>
              <span className="text-gray-300">{filter.count}개</span>
            </li>
          ))}
        </ul>

        <div className="p-4 flex items-center justify-between">
          <button
            onClick={() => setSelectedFilter(null)}
            className="text-gray-400 text-2xl"
          >
            ↻
          </button>
          <button className="bg-yellow-400 text-black font-bold py-3 px-5 rounded-lg flex-1">
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
