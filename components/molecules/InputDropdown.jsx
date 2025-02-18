"use client";

import React, { useId } from "react";
import Label from "../atoms/Label";
import SelectForm from "../atoms/SelectForm";
import { useController } from "react-hook-form";

/**
 * control : useFrom에서 꺼낸 컨트롤러
 * name : useForm에 등록할 name, 예) "rank"
 * size : "sm", "md", "lg(기본값)" 택1
 * options : [{ value: "COMMON", label: "COMMON" }, { value: "RARE", label: "RARE" }]
 * placeholder
 * label
 */

function InputDropdown({ control, name, size, options, label, placeholder }) {
  const inputId = useId();
  const { field, fieldState } = useController({ name, control });

  return (
    <div className="flex flex-col gap-[10px]">
      <Label htmlFor={inputId}>{label}</Label>
      <SelectForm
        id={inputId}
        placeholder={placeholder}
        size={size}
        options={options}
        error={!!fieldState.error}
        {...field}
      />
      {<small className="text-[#ff483d]">{fieldState.error?.message}</small>}
    </div>
  );
}

export default InputDropdown;
