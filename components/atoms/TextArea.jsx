import clsx from "clsx";

// boxSize => sm: 345x140 / md: 440x140 / lg:520x180

function TextArea({ id, placeholder, size = "lg", error = false, ...props }) {
  const sizeClassNames = clsx({
    "w-[345px] h-[140px]": size === "sm",
    "w-[440px] h-[140px]": size === "md",
    "w-[520px] h-[180px]": size === "lg",
  });

  const errorBorderClassNames = clsx({
    "border-[#ff483d]": error === true,
    "border-gray-200": error === false,
  });

  return (
    <textarea
      className={clsx(
        sizeClassNames,
        errorBorderClassNames,
        "border rounded-sm bg-black placeholder-gray-200 placeholder:font-thin text-white px-5 py-[18px]"
      )}
      id={id}
      placeholder={placeholder}
      aria-invalid={error}
      {...props}
    />
  );
}

export default TextArea;
