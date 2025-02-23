'use client';

import { useRouter } from 'next/navigation';
import Button from '../atoms/Button';
import ResultContent from '../atoms/ResultContent';
import ResultTitle from '../atoms/ResultTitle';

function ResultPurchase({ grade, name, count, isSuccess = 'true' }) {
  const router = useRouter();

  const title02 = isSuccess ? '성공' : '실패';
  const buttonText = isSuccess
    ? '마이갤러리에서 확인하기'
    : '마켓플레이스로 돌아가기';
  const handleClickButton = () => {
    if (isSuccess) {
      router.push('/my-cards/gallery');
    } else {
      router.push('/');
    }
  };
  return (
    <div className="h-[100vh] flex justify-center items-center pb-20">
      <div className="flex flex-col items-center gap-10">
        <ResultTitle
          title01={'구매'}
          title02={` ${title02}`}
          isSuccess={isSuccess}
        />
        <ResultContent
          content={`[${grade} | ${name}] ${count}장
           구매에 ${title02}했습니다!`}
        />
        <div className="w-[226px] lg:w-[440px]">
          <Button
            onClick={handleClickButton}
            intent="secondary"
            className="md:h-[55px] sm:h-[55px]"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResultPurchase;
