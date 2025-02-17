import clsx from "clsx";
import imgDropdown from "@/assets/images/dropdown-icon.png";

// boxSize => sm: 345x55 / md: 440x55 / lg:520x60
// name = "genre"
// options = [ {name: "여행", value: "travel"}, {name: "풍경", value: "landscape"} ]

function SelectForm({
  id,
  name,
  nameKR,
  placeholder,
  type,
  size = "lg",
  options,
  ...props
}) {
  const sizeClassNames = clsx({
    "w-[345px] h-[55px]": size === "sm",
    "w-[440px] h-[55px]": size === "md",
    "w-[520px] h-[60px]": size === "lg",
  });

  return (
    <select
      style={{
        backgroundImage: `url(${imgDropdown.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "calc(100% - 15px) center",
        backgroundSize: "1.5rem",
      }}
      className={clsx(
        sizeClassNames,
        "border rounded-sm bg-black text-white text- px-5 py-[18px] appearance-none"
      )}
      defaultValue=""
      id={id}
      name={name}
      {...props}
    >
      <option style={{ fontWeight: 100 }} value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((item, index) => {
        return (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        );
      })}
    </select>
  );
}

export default SelectForm;
