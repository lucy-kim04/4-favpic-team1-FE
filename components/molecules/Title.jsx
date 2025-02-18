function Title({ children, intent, onClick }) {
  return (
    <div>
      <div>
        <p>{children}</p>
        <Button></Button>
      </div>
      <div></div>
    </div>
  );
}

export default Title;
