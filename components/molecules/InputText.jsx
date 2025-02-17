"use client";

import React, { useId } from "react";
import { useFormContext } from "react-hook-form";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

function InputText({ name = "포토카드 이름" }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputId = useId();

  return (
    <div className="flex flex-col gap-[10px]">
      <Label htmlFor={inputId}>{name}</Label>
      <Input
        id={inputId}
        type={"text"}
        placeholder={`${name}을 입력해 주세요.`}
        error={errors.text ? "true" : "false"}
        {...register("text", {
          required: `${name}은 필수 입력입니다.`,
          maxLength: {
            value: 30,
            message: "포토카드 이름은 최대 30자까지 입력가능합니다.",
          },
        })}
      />
      {<small className="text-[#ff483d]">{errors.text?.message}</small>}
    </div>
  );
}

export default InputText;
