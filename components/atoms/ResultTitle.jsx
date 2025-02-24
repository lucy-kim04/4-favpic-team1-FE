function ResultTitle({ title01, title02, isSuccess }) {
  const textColor = isSuccess ? 'text-[#EFFF04]' : 'text-[#A4A4A4]';
  return (
    <div className="font-baskinB text-[46px]">
      <span>{title01}</span>
      <span className={textColor}>{title02}</span>
    </div>
  );
}

export default ResultTitle;
