"use client";

import React, { useId, useState } from "react";
import { useFormContext } from "react-hook-form";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import imgOpendEye from "../../assets/images/eye-opened-icon.png";
import imgClosedEye from "../../assets/images/eye-closed-icon.png";
import Image from "next/image";
import clsx from "clsx";

function InputPassword({ size = "lg" }) {
  const [showPassword, setShowPassword] = useState(false);

  const sizeClassNames = clsx({
    "max-w-[520px]": size === "lg",
    "max-w-[440px]": size === "md",
    "max-w-[345px]": size === "sm",
  });

  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputId = useId();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <Label htmlFor={inputId}>비밀번호</Label>
      <div
        className={clsx(sizeClassNames, "relative flex items-center w-full")}
      >
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
        <div className="absolute right-3">
          <Image
            src={showPassword ? imgOpendEye : imgClosedEye}
            height={24}
            width={24}
            alt={"show password Icon"}
            onClick={handleTogglePassword}
          />
        </div>
      </div>
      {<small className="text-[#ff483d]">{errors.password?.message}</small>}
    </div>
  );
}

export default InputPassword;
