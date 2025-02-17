import clsx from "clsx";

function Button({
  children,
  intent = "primary",
  height = "60px",
  textSize = "base",
  disabled = false,
  className,
  ...props
}) {
  const defaultClassName = clsx(
    `w-full h-[${height}] text-${textSize} font-bold hover:brightness-90 active:brightness-75 transition`
  );
  const intentClassName = clsx({
    "bg-[#efff04] text-[#0f0f0f]": intent === "primary",
    "bg-[#0f0f0f] border border-white hover:brightness-200 active:brightness-75 transition":
      intent === "secondary",
  });
  const disableClassName = clsx({
    "bg-[#5a5a5a] text-[#a4a4a4] hover:brightness-100 active:brightness-100 cursor-default":
      disabled,
  });
  return (
    <button
      className={clsx(defaultClassName, intentClassName, disableClassName)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
