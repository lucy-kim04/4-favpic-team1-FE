'use client';

import usersApi from '@/api/users/users.api';
import icX from '@/assets/images/ic-x.png';
import randomBoxesL from '@/assets/images/random-boxes-L.png';
import { useModal } from '@/contexts/ModalContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ModalBackGround from '../atoms/ModalBackGround';
import ResultTitle from '../atoms/ResultTitle';
import ConfirmModal from './ConfirmModal';

function PointDrawModal() {
  const modal = useModal();
  const [second, setSecond] = useState(10);
  const [minute, setMinute] = useState(0);
  const [isPossibleDraw, setIsPossibleDraw] = useState(false);
  const interval = useRef();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: usersApi.getMe,
  });

  // console.log('분', minDiff);
  // console.log('초', secDiff);

  const { mutate: addPoint } = useMutation({
    mutationFn: (point) => usersApi.addPoint(point),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  const { mutate: recordLastDrawingTime } = useMutation({
    mutationFn: usersApi.recordLastDrawingTime,
  });

  const handleClickCloseButton = () => {
    modal.close();
  };

  const handleClickRandomBoxes = () => {
    if (!isPossibleDraw) return;
    recordLastDrawingTime();
    setTimeout(() => {
      return modal.open(<PointDrawModal />);
    }, 5000);
    modal.close();
    const pointList = [10, 10, 10, 10, 30, 30, 30, 50, 50, 100];
    const randomPoint = pointList[Math.floor(Math.random() * 10)];
    return modal.open(
      <ConfirmModal
        title={'축하합니다!'}
        content={`${randomPoint}포인트에 당첨되셨습니다!!`}
        buttonText="포인트 추가"
        onClick={() => addPoint(randomPoint)}
      />
    );
  };
  useEffect(() => {
    if (!user?.lastDrawingTime) return; // 추첨을 한 번도 한 적이 없으면 그냥 타이머 시작

    const lastTime = user?.lastDrawingTime || 0;
    const now = new Date();
    const diff = now - new Date(lastTime);

    // 추첨한지 1시간이 지났으면 바로 추첨할 수 있도록
    const hour = 3600000;
    const min = 60000;
    if (diff > hour) {
      setIsPossibleDraw(true);
      return;
    }

    // 1시간 경과까지의 시간을 카운트에 반영
    const minDiff = Math.floor(diff / 60000);
    const secDiff = Math.floor(diff / 1000) - minDiff * 60;

    setMinute(59 - minDiff);
    setSecond(59 - secDiff);
  }, []);

  useEffect(() => {
    // 불필요한 타이머 생성/삭제를 방지하기 위해 ref 사용
    interval.current = setInterval(() => {
      setSecond((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    if (second === -1) {
      // 1분이 지나면
      setMinute((prev) => prev - 1); // 분 타이머 1만큼 감소
      setSecond(59); // 초 타이머 초기화
    } else if (second === 0 && minute === 0) {
      setIsPossibleDraw(true);
      clearInterval(interval.current);
    }
  }, [second]);

  return (
    <ModalBackGround>
      <div className="relative flex flex-col justify-center items-center bg-[#161616] w-[1034px] h-[646px]">
        <Image
          src={icX}
          alt="닫기"
          className={`w-[28px] absolute top-[15px] lg:top-[30px] right-[15px] lg:right-[30px] cursor-pointer`}
          onClick={handleClickCloseButton}
        />
        <div className="mb-10">
          <ResultTitle title01={'랜덤'} title02={`포인트`} isSuccess={true} />
        </div>
        <p className="text-xl font-bold">1시간마다 돌아오는 기회!</p>
        <p className="text-xl font-bold mb-10">
          랜덤 상자 뽑기를 통해 포인트를 획득하세요!
        </p>
        {isPossibleDraw ? (
          <p className="mb-20 font-bold text-[#efff04]">
            세 개의 상자 중 하나를 골라주세요!!
          </p>
        ) : (
          <p className="mb-20">
            <span className="mr-2 text-[#a4a4a4]">다음 기회까지 남은 시간</span>
            <span className="text-[#efff04]">
              {minute}분 {second}초
            </span>
          </p>
        )}
        <Image
          src={randomBoxesL}
          alt="랜덤박스"
          className={`w-[835px] ${isPossibleDraw ? '' : 'opacity-30'} ${
            isPossibleDraw ? 'cursor-pointer' : ''
          }`}
          onClick={handleClickRandomBoxes}
        />
      </div>
    </ModalBackGround>
  );
}

export default PointDrawModal;
