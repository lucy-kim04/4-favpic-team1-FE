'use client';

function GradeMyCardLevelCount({ cardLevel, count }) {
  const getLevelStyle = () => {
    switch (cardLevel) {
      case 'COMMON':
        return 'text-[#EFFF04] border-[#EFFF04]';
      case 'RARE':
        return 'text-[#29C9F9] border-[#29C9F9]';
      case 'SUPER RARE':
        return 'text-[#A77EFF] border-[#A77EFF]';
      case 'LEGENDARY':
        return 'text-[#FF2A6A] border-[#FF2A6A]';
      default:
        return 'text-gray-500 border';
    }
  };

  return (
    <div
      className={`px-[10px] lg:px-4 py-[6px] lg:py-2 rounded-none flex gap-1 w-fit bg-[#0F0F0F] border ${getLevelStyle()}`}
    >
      <span className='text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-thin'>
        {cardLevel}
      </span>
      <span className='text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-thin'>
        {count}장
      </span>
    </div>
  );

  // 실제 사용되는 화면은 나의 카드 보유에서만 한줄로 노출 되고 있는데 각각 렌더링 해야하는지?
  // 이후 결정 후에 삭제 진행

  // const levels = ['COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY'];

  // return (
  //   <div className='flex gap-4'>
  //     {levels.map((level) => (
  //       <div
  //         key={level}
  //         className={`px-4 py-2 rounded-none bg-[#0F0F0F] border ${getLevelStyle(
  //           level
  //         )}`}
  //       >
  //         <span className='text-[12px] sm:text-[14px] lg:text-[16px] font-bold'>
  //           {level}
  //         </span>
  //         <span className='ml-2 text-[12px] sm:text-[14px] lg:text-[16px]'>
  //           {cardCounts[level]}장
  //         </span>
  //       </div>
  //     ))}
  //   </div>
  // );
}

export default GradeMyCardLevelCount;
