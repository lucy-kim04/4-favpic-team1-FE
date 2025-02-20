import Divider from '../atoms/Divider';
import GradeCardBadge from '../atoms/GradeCardBadge';

function CardDetailTop({ cardDetail, topIntent = 'detailAll' }) {
  const {
    nickname,
    grade,
    genre,
    purchacedPrice,
    remainingCount,
    reserveCount,
    description,
  } = cardDetail;

  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex gap-[15px]'>
          <GradeCardBadge variant='detail'>{grade}</GradeCardBadge>
          <span>|</span>
          <p className='font-bold text-lg lg:text-2xl text-[#4a4a4a]'>
            {genre}
          </p>
        </div>
        <div className='font-bold text-lg lg:text-2xl underline'>
          {nickname}
        </div>
      </div>
      <Divider />
      {topIntent !== 'myCardDetail' && (
        <>
          <p className='font-normal text-base lg:text-lg'>{description}</p>
          <Divider />
          <div className='text-xl lg:text-2xl flex flex-col gap-[10px]'>
            <div className='flex justify-between'>
              <p className='text-[#a4a4a4]'>가격</p>
              <p>{purchacedPrice} P</p>
            </div>
            <div className='flex justify-between font-normal text-xl lg:text-2xl'>
              <p className='text-[#a4a4a4]'>수량</p>
              <p>
                {remainingCount} /{' '}
                <span className='text-[#a4a4a4]'>{reserveCount}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CardDetailTop;
