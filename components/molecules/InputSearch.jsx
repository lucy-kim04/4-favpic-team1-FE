"use client";

import React, { useId } from "react";
import { useFormContext } from "react-hook-form";
import Input from "../atoms/Input";
import Image from "next/image";
import ImgSearch from "@/assets/images/search-icon.png";
import clsx from "clsx";

/**
 * options
 * 1. size = lg, md, sm
 */
function InputSearch({ size = "lg" }) {
  const { register } = useFormContext();
  const inputId = useId();

  const sizeClassNames = clsx({
    "max-w-[345px] h-[45px] mb-1": size === "lg",
    "max-w-[320px] h-[50px] mb-1": size === "md",
    "max-w-[200px] h-[45px] mb-1": size === "sm",
  });

  // size 옵션에 따라 검색 아이콘 위치 조정
  const iconPositionClassNames = clsx({
    "right-4": size === "lg",
    "right-3": size === "md",
    "right-0": size === "sm",
  });

  return (
    <div
      className={clsx(
        sizeClassNames,
        "relative flex items-center w-full mt-3 mb-2"
      )}
    >
      <Input
        id={inputId}
        type={"text"}
        placeholder={"검색"}
        size={size}
        {...register("search")}
      />
      <div
        className={clsx(iconPositionClassNames, "absolute pointer-events-none")}
      >
        <Image src={ImgSearch} height={24} width={24} alt="search Icon" />
      </div>
    </div>
  );
}

export default InputSearch;
