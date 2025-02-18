"use client";

import React, { useId } from "react";
import { useController } from "react-hook-form";
import Label from "../atoms/Label";
import TextArea from "../atoms/TextArea";

/**
 * control : useFrom에서 꺼낸 컨트롤러
 * name : useForm에 등록할 name, 예) "rank"
 * size : "sm", "md", "lg(기본값)" 택1
 * label
 * placeholder
 * rules : useFrom rule 객체, 예) {maxLength: {value: 30, message: "30자 이하로 작성해주세요" }}
 */

function InputTextBox({
  control,
  name,
  size = "lg",
  label,
  placeholder,
  rules = {},
}) {
  const inputId = useId();
  const { field, fieldState } = useController({ name, control, rules });

  return (
    <div className="flex flex-col gap-[10px]">
      <Label htmlFor={inputId}>{label}</Label>
      <TextArea
        id={inputId}
        size={size}
        placeholder={placeholder}
        error={!!fieldState.error}
        {...field}
      />
      {<small className="text-[#ff483d]">{fieldState.error?.message}</small>}
    </div>
  );
}

export default InputTextBox;
