'use client';

import { useModal } from '@/contexts/ModalContext';
import iconX from '@/assets/images/ic-x.png';
import Image from 'next/image';
import { useEffect } from 'react';
import ConfirmModal from '../molecules/ConfirmModal';

function Modal({ children, ...props }) {
  const modals = useModal();

  // 모달이 열릴 때 body 스크롤 잠금
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleClickModalOutside = () => {
    modals.open(
      <ConfirmModal
        title={'작업 취소'}
        content={'현재 작업을 취소할까요?'}
        buttonText="취소하기"
        onClick={() => modals.closeAll()}
      />
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-20"
      onClick={handleClickModalOutside}
    >
      <div
        ref={props.ref}
        onClick={(e) => e.stopPropagation()}
        className="fixed top-10 bg-[#161616] w-[1160px] h-[1000px] px-[120px] py-[60px] max-h-[90vh] overflow-y-auto"
      >
        <div className="relative">
          <button
            className="absolute -right-20 -top-6 z-30"
            onClick={modals.close}
          >
            <Image alt="모달창 닫기" src={iconX} width={32} height={32} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
