import Image from 'next/image';
import GradeCardBadge from '../atoms/GradeCardBadge';

function CardTop({ card }) {
  const { seller, name, grade, genre, imgUrl } = card;
  return (
    <>
      <Image src={imgUrl} alt="우리집 앞마당" className="w-[360px] mb-6" />
      <p className="text-[22px] font-bold truncate mb-[10px]">{name}</p>
      <div className="flex justify-between">
        <div className="flex items-center">
          <GradeCardBadge>{grade}</GradeCardBadge>
          <div className="w-[1px] h-5 bg-[#5a5a5a] mx-3"></div>
          <p className="text-[#a4a4a4] font-normal">{genre}</p>
        </div>
        <p className="underline font-normal">{seller}</p>
      </div>
      <div className="h-[1px] bg-[#5a5a5a] my-5"></div>
    </>
  );
}

export default CardTop;
