"use client";

import React, { useId } from "react";
import { useFormContext } from "react-hook-form";
import Label from "../atoms/Label";
import SelectForm from "../atoms/SelectForm";

const options = [
  { value: "COMMON", label: "COMMON" },
  { value: "RARE", label: "RARE" },
  { value: "SUPER RARE", label: "SUPER RARE" },
  { value: "LEGENDARY", label: "LEGENDARY" },
];

function InputDropdownRank({ name = "포토카드 이름" }) {
  const { register } = useFormContext();
  const inputId = useId();

  return (
    <div className="flex flex-col gap-[10px]">
      <Label htmlFor={inputId}>{name}</Label>
      <SelectForm
        id={inputId}
        placeholder={"등급을 선택해 주세요."}
        options={options}
        {...register("rankOptions")}
      />
    </div>
  );
}

export default InputDropdownRank;
