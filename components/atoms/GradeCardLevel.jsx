'use client';

function GradeCardLevel({ cardLevel }) {
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
    <span className={`text-[12px] lg:text-[16px] font-thin ${getLevelStyle()}`}>
      {cardLevel}
    </span>
  );
}

export default GradeCardLevel;
