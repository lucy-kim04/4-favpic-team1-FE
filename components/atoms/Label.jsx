function Label({ children, htmlFor }) {
  return (
    <label className={"text-lg text-white"} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default Label;
