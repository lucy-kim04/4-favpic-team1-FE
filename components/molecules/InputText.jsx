"use client";

import React, { useId } from "react";
import { useController } from "react-hook-form";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

/**
 * - control : useFrom에서 꺼낸 컨트롤러
 * - type : input의 type, 기본값 "text"
 * - name : useForm에 등록할 name, 예) "rank"
 * - rules : useFrom rule 객체, 예) {maxLength: {value: 30, message: "30자 이하로 작성해주세요" }}
 * - size : "sm", "md", "lg(기본값)" 택1
 * - placeholder
 * - label
 */

function InputText({
  control,
  type = "text",
  name,
  rules = {},
  size = "lg",
  label,
  placeholder,
}) {
  const { field, fieldState } = useController({ name, control, rules });
  const inputId = useId();

  return (
    <div className="flex flex-col gap-[10px]">
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        type={type}
        size={size}
        placeholder={placeholder}
        error={!!fieldState.error}
        {...field}
      />
      {<small className="text-[#ff483d]">{fieldState.error?.message}</small>}
    </div>
  );
}

export default InputText;
