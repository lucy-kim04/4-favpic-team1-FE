import clsx from "clsx";
import icDown from "@/assets/images/ic-down.png";
import { useState } from "react";

// boxSize => sm: 345x55 / md: 440x55 / lg:520x60
// name = "genre"
// options = [ {name: "여행", value: "travel"}, {name: "풍경", value: "landscape"} ]

function SelectForm({
  id,
  name,
  placeholder,
  size = "lg",
  options,
  onChange,
  value,
  ...props
}) {
  const widthClassNames = clsx({
    "w-[345px]": size === "sm",
    "w-[440px]": size === "md",
    "w-[520px]": size === "lg",
  });

  const hieghtClassNames = clsx({
    "h-[55px]": size === "sm",
    "h-[55px]": size === "md",
    "h-[60px]": size === "lg",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleBlur = (e) => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const selectedOption = options.find((option) => option.value === value);

  const handleOptionClick = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div tabIndex={0} onBlur={handleBlur}>
      {/* hidden select는 폼 제출 및 접근성을 위한 역할 */}
      <select
        id={id}
        name={name}
        className="hidden"
        value={value}
        onChange={() => {}}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>

      {/* 커스텀 UI */}
      <div
        className={clsx(
          widthClassNames,
          hieghtClassNames,
          "flex items-center py-[20px] px-[18px] border"
        )}
        style={{
          backgroundImage: `url(${icDown.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "calc(100% - 15px) center",
          backgroundSize: "1.5rem",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {}
        {selectedOption ? (
          selectedOption.label
        ) : (
          <small className="font-thin text-base text-gray-200">
            {placeholder}
          </small>
        )}
      </div>
      {isOpen && (
        <div
          className={clsx(
            widthClassNames,
            "absolute bg-black flex flex-col gap-5 border mt-1 py-[20px] px-[18px] z-10"
          )}
        >
          {options.map((option) => (
            <div key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectForm;
