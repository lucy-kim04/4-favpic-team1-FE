"use client";

import React, { useId } from "react";
import { useController } from "react-hook-form";
import Input from "../atoms/Input";
import Image from "next/image";
import icSearch from "@/assets/images/ic-search.png";
import clsx from "clsx";

/**
 * control : useFrom에서 꺼낸 컨트롤러
 * name : useForm에 등록할 name, 예) "rank"
 * size : "sm", "md", "lg(기본값)" 택1
 * placeholder : 기본값 "검색"
 * rules : useFrom rule 객체, 예) {maxLength: {value: 30, message: "30자 이하로 작성해주세요" }}
 */

function InputSearch({
  control,
  name,
  size = "lg",
  placeholder = "검색",
  rules = {},
}) {
  const inputId = useId();
  const { field, fieldState } = useController({ name, control, rules });

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
        placeholder={placeholder}
        size={size}
        {...field}
      />
      <div
        className={clsx(iconPositionClassNames, "absolute pointer-events-none")}
      >
        <Image src={icSearch} height={24} width={24} alt="search Icon" />
      </div>
    </div>
  );
}

export default InputSearch;
