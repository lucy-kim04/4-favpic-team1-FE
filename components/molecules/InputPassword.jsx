"use client";

import React, { useId, useState } from "react";
import { useFormContext } from "react-hook-form";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import imgOpendEye from "../../assets/images/eye-opened-icon.png";
import imgClosedEye from "../../assets/images/eye-closed-icon.png";
import Image from "next/image";

function InputPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors, isSubmitted },
  } = useFormContext();
  const inputId = useId();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <Label htmlFor={inputId}>비밀번호</Label>
      <div className="relative flex items-center w-full">
        <Input
          id={inputId}
          type={showPassword ? "text" : "password"}
          placeholder={"비밀번호를 입력해 주세요."}
          error={errors.password ? "true" : "false"}
          // todo,구현 => 비밀번호가 일치하지 않습니다
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
          })}
        />
        <Image
          className="absolute left-[480px]"
          src={showPassword ? imgOpendEye : imgClosedEye}
          height={24}
          width={24}
          alt={"show password Icon"}
          onClick={handleTogglePassword}
        />
      </div>
      {<small className="text-[#ff483d]">{errors.password?.message}</small>}
    </div>
  );
}

export default InputPassword;
