"use client";

import React, { useId, useState } from "react";
import { useController } from "react-hook-form";
import Label from "../atoms/Label";
import clsx from "clsx";

/**
 * control : useFrom에서 꺼낸 컨트롤러
 * name : useForm에 등록할 name, 예) "rank"
 * size : "sm", "md", "lg(기본값)" 택1
 * label
 * placeholder
 * rules : useFrom rule 객체, 예) {maxLength: {value: 30, message: "30자 이하로 작성해주세요" }}
 */

function InputUpload({
  control,
  name,
  size = "lg",
  label,
  placeholder,
  rules,
}) {
  const sizeClassNames = clsx({
    "w-[230px] h-[55px]": size === "sm",
    "w-[310px] h-[55px]": size === "md",
    "w-[390px] h-[60px]": size === "lg",
  });

  const inputId = useId();
  const { field, fieldState } = useController({ name, control, rules });

  const handleChange = (e) => {
    const file = e.target.files[0] || null;
    field.onChange(file);
  };

  return (
    <div className="flex flex-col gap-[10px] mb-1">
      <Label htmlFor={inputId}>{label}</Label>
      <div className="flex gap-2">
        <div
          className={clsx(
            sizeClassNames,
            "border py-[20px] px-[18px] flex items-center"
          )}
        >
          {field.value ? (
            field.value.name
          ) : (
            <small className="font-thin text-gray-200 text-base">
              {placeholder}
            </small>
          )}
        </div>
        <input
          id="file-input"
          type="file"
          className="hidden"
          name={name}
          onChange={handleChange}
        />
        <label
          htmlFor="file-input"
          className="text-[#EFFF04] flex items-center justify-center border border-[#EFFF04]  w-[120px] h-[60px]"
        >
          파일 선택
        </label>
      </div>
      {<small className="text-[#ff483d]">{fieldState.error?.message}</small>}
    </div>
  );
}

export default InputUpload;
