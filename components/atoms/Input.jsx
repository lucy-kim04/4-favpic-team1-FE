import clsx from 'clsx';

// boxSize => sm: 345x55 / md: 440x55 / lg:520x60
// only search size => s-sm: 200x45 / s-md: 280x24 /
// type => text, email, password, search, textbox, upload, dropdown?

function Input({
  id,
  placeholder,
  type,
  value,
  size = 'lg',
  error = false,
  ...props
}) {
  const sizeClassNames = clsx(
    'w-[345px] lg:w-[520px] md:w-[440px]',
    'h-[60px] lg:h-[60px] md:h-[55px] sm:h-[55px]'
  );

  const errorBorderClassNames = clsx({
    'border-[#ff483d]': error === true,
    'border-gray-200': error === false,
  });

  const mdSizeClassNames = clsx({
    'md:w-full md:h-[55px]': true,
  });

  const smSizeClassNames = clsx({
    'sm:w-full': true,
  });

  return (
    <input
      className={clsx(
        sizeClassNames,
        errorBorderClassNames,
        'border rounded-sm bg-transparent placeholder-gray-200 placeholder:font-thin text-white px-5 py-[18px]',
        mdSizeClassNames,
        smSizeClassNames
      )}
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      aria-invalid={error}
      {...props}
    />
  );
}

export default Input;
