"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import resetImg from "@/assets/images/reset.png";

export default function FilterModal({ filters, onSelect, onClose }) {
  const [selectedTab, setSelectedTab] = useState("등급");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter.label);
    onSelect(filter.label);
  };

  return (
    <div
      className={clsx(
        "fixed z-10 inset-0 flex items-end justify-center bg-black bg-opacity-50 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        ref={modalRef}
        className={clsx(
          "bg-[#1B1B1B] text-white w-[375px] h-[480px] rounded-t-lg overflow-hidden transform transition-transform duration-300",
          isVisible ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex justify-between items-center p-4 relative">
          <span className="absolute left-1/2 transform -translate-x-1/2 text-gray-400">
            필터
          </span>
          <button onClick={handleClose} className="ml-auto text-gray-400">
            &times;
          </button>
        </div>

        <div className="flex px-[24px]">
          {Object.keys(filters).map((category) => (
            <button
              key={category}
              className={clsx(
                "w-[87px] text-center py-3 text-[14px]",
                selectedTab === category
                  ? "text-white border-b-2 border-white"
                  : "text-[#5a5a5a]"
              )}
              onClick={() => setSelectedTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <ul
          className={clsx(
            selectedTab === "장르" || selectedTab === "매진 여부"
              ? "mt-[16px]"
              : ""
          )}
        >
          {filters[selectedTab]?.map((filter) => {
            const gradeClassName = clsx({
              "text-[#EFFF04]": filter.label === "COMMON",
              "text-[#29C9F9]": filter.label === "RARE",
              "text-[#A77EFF]": filter.label === "SUPER RARE",
              "text-[#FF2A6A]": filter.label === "LEGENDARY",
            });

            return (
              <li
                key={filter.label}
                className={clsx(
                  "flex justify-between items-center px-[32px] py-[16px] cursor-pointer text-[14px] h-[52px]",
                  "hover:bg-gray-700",
                  selectedFilter === filter.label && "bg-[#161616]"
                )}
                onClick={() => handleFilterSelect(filter)}
              >
                <span
                  className={clsx(
                    selectedTab === "등급"
                      ? gradeClassName
                      : selectedFilter === filter.label
                      ? "text-white"
                      : "text-[#a4a4a4]"
                  )}
                >
                  {filter.label}
                </span>
                <span
                  className={clsx(
                    selectedFilter === filter.label
                      ? "text-[#eeeeee]"
                      : "text-[#a4a4a4]"
                  )}
                >
                  {filter.count}개
                </span>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between absolute bottom-[30px] left-[8px] gap-[10px]">
          <button
            onClick={() => setSelectedFilter(null)}
            className="text-gray-400 text-2xl"
          >
            <img src={resetImg.src} alt="리셋" className="w-[54px] h-[55px]" />
          </button>
          <button className="bg-[#EFFF04] w-[272px] h-[55px] text-black text-[16px] font-bold py-3 px-5 rounded-[2px]">
            {selectedFilter &&
            filters[selectedTab]?.some((f) => f.label === selectedFilter)
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
