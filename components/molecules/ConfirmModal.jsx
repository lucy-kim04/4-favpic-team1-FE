'use client';

import lineBreakText from '@/ utils/lineBreakText';
import icX from '@/assets/images/ic-x.png';
import { useModal } from '@/contexts/ModalContext';
import Image from 'next/image';
import Button from '../atoms/Button';
import ModalBackGround from '../atoms/ModalBackGround';

/**
 * 컨펌 모달창 사용 방법
 * - title: 제목
 * - content: 내용
 *   - 줄바꿈이 필요한 경우 template문자열을 이용하여 줄바꿈된 문자열을 전달
 * - buttonText: 버튼명(기본값 '확인')
 * - onClick: 버튼 클릭 시 실행 함수(전달하지 않을 경우 기본적으로 'modal.close()' 작동)
 */
function ConfirmModal({ title, content, buttonText = '확인', onClick }) {
  const modal = useModal();

  const handleClickConfirm = () => {
    if (onClick) {
      onClick();
      modal.close();
    } else {
      modal.close();
    }
  };

  const handleClickCloseButton = () => {
    modal.close();
  };
  return (
    <ModalBackGround>
      <div className="relative flex justify-center items-center bg-[#161616] w-[560px] sm:w-full h-[375px] sm:mx-[15px]">
        <Image
          src={icX}
          alt="닫기"
          className="w-[28px] absolute top-[15px] lg:top-[30px] right-[15px] lg:right-[30px] cursor-pointer"
          onClick={handleClickCloseButton}
        />
        <div className="flex flex-col items-center gap-10">
          <p className="grow-0 text-lg lg:text-2xl font-bold">{title}</p>
          <p className="grow-0 mb-5 text-sm lg:text-base text-[#a4a4a4] md:hidden sm:hidden">
            {content}
          </p>
          <p className="grow-0 mb-5 text-[#a4a4a4] text-center lg:hidden">
            {lineBreakText(content)}
          </p>
          <div className="w-[170px] md:w-[140px] sm:w-[120px]">
            <Button
              onClick={handleClickConfirm}
              className="md:h-[55px] sm:h-[55px]"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </ModalBackGround>
  );
}

export default ConfirmModal;
