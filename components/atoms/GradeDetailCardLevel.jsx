'use client';
function GradeDetailCardLevel({ cardLevel }) {
  const getLevelStyle = () => {
    switch (cardLevel) {
      case 'COMMON':
        return 'text-[#EFFF04]';
      case 'RARE':
        return 'text-[#29C9F9]';
      case 'SUPER RARE':
        return 'text-[#A77EFF]';
      case 'LEGENDARY':
        return 'text-[#FF2A6A]';
      default:
        return 'text-gray-500';
    }
  };
  return (
    <span
      className={`text-[18px] lg:text-[24px] font-semibold ${getLevelStyle()}`}
    >
      {cardLevel}
    </span>
  );
}
export default GradeDetailCardLevel;
