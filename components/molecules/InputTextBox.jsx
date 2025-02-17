"use client";

import React, { useId } from "react";
import { useFormContext } from "react-hook-form";
import Label from "../atoms/Label";
import TextArea from "../atoms/TextArea";

function InputTextBox({ name = "포토카드 설명" }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputId = useId();

  return (
    <div className="flex flex-col gap-[10px]">
      <Label htmlFor={inputId}>{name}</Label>
      <TextArea
        id={inputId}
        placeholder={`${name}을 입력해 주세요.`}
        error={errors.textArea ? "true" : "false"}
        {...register("textArea", {
          required: `${name}은 필수 입력입니다.`,
        })}
      />
      {<small className="text-[#ff483d]">{errors.textArea?.message}</small>}
    </div>
  );
}

export default InputTextBox;
