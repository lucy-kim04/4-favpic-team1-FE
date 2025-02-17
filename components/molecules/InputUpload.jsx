"use client";

import React, { useId } from "react";
import { useFormContext } from "react-hook-form";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

function InputUpload({ size = "lg" }) {
  const { register } = useFormContext();
  const inputId = useId();

  return (
    <div className="flex flex-col gap-[10px]">
      <Label htmlFor={inputId}>{"사진 업로드"}</Label>
      <Input
        id={inputId}
        type={"file"}
        placeholder={"사진 업로드"}
        {...register("upload")}
      />
      <input id="file-input" type="file" className="hidden" />
      <label
        htmlFor="file-input"
        className="text-[#EFFF04] flex items-center justify-center border border-[#EFFF04]  w-[120px] h-[60px]"
      >
        파일 선택
      </label>
    </div>
  );
}

export default InputUpload;
