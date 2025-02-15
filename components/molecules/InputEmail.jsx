"use client";

import React, { useId } from "react";
import { useFormContext } from "react-hook-form";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

function InputEmail() {
  const {
    register,
    formState: { errors, isSubmitted },
  } = useFormContext();
  const inputId = useId();

  return (
    <div className="flex flex-col gap-[10px]">
      <Label htmlFor={inputId}>이메일</Label>
      <Input
        id={inputId}
        type={"email"}
        placeholder={"이메일을 입력해 주세요."}
        error={errors.email ? "true" : "false"}
        {...register("email", {
          required: "이메일은 필수 입력입니다.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "이메일 형식에 맞지 않습니다.",
          },
        })}
      />
      {<small className="text-[#ff483d]">{errors.email?.message}</small>}
    </div>
  );
}

export default InputEmail;
