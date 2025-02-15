import clsx from "clsx";

// boxSize => sm: 345x55 / md: 440x55 / lg:520x60
// type => text, email, password, search, textbox, upload, dropdown?

function Input({
  id,
  placeholder,
  type,
  size = "lg",
  error = "false",
  ...props
}) {
  const sizeClassNames = clsx({
    "w-[345px] h-[55px]": size === "sm",
    "w-[440px] h-[55px]": size === "md",
    "w-[520px] h-[60px]": size === "lg",
  });

  const errorBorderClassNames = clsx({
    "border-[#ff483d]": error === "true",
    "border-gray-200": error === "false",
  });

  return (
    <input
      className={clsx(
        sizeClassNames,
        errorBorderClassNames,
        "border rounded-sm bg-black placeholder-gray-200 placeholder:font-thin text-white px-5 py-[18px]"
      )}
      id={id}
      type={type}
      placeholder={placeholder}
      aria-invalid={error}
      {...props}
    />
  );
}

export default Input;
