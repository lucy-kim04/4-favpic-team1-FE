'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useId, useState } from 'react';
import { useController } from 'react-hook-form';
import icEyeOff from '../../assets/images/ic-eye-off.png';
import icEye from '../../assets/images/ic-eye.png';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

/**
 * control : useFrom에서 꺼낸 컨트롤러
 * name: useForm에 등록할 name, 예) "rank"
 * rules: useFrom rule 객체, 예) {maxLength: {value: 30, message: "30자 이하로 작성해주세요" }}
 * size: "sm", "md", "lg(기본값)" 택1
 * label
 * placeholder
 */

function InputPassword({
  control,
  name,
  rules = {},
  size = 'lg',
  label,
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { field, fieldState } = useController({ name, control, rules });
  const inputId = useId();

  const sizeClassNames = clsx(
    'w-[345px] lg:w-[520px] md:w-[440px]',
    'h-[60px] lg:h-[60px] md:h-[55px] sm:h-[55px]'
  );

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='flex flex-col gap-[10px]'>
      <Label htmlFor={inputId}>{label}</Label>
      <div
        className={clsx(sizeClassNames, 'relative flex items-center w-full')}
      >
        <Input
          id={inputId}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          error={!!fieldState.error}
          {...field}
        />
        <div className='absolute right-3'>
          <Image
            src={showPassword ? icEye : icEyeOff}
            height={24}
            width={24}
            alt={'show password Icon'}
            onClick={handleTogglePassword}
          />
        </div>
      </div>
      {<small className='text-[#ff483d]'>{fieldState.error?.message}</small>}
    </div>
  );
}

export default InputPassword;
