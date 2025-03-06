'use client';

import iconLess from '@/assets/images/ic-less.png';
import iconX from '@/assets/images/ic-x.png';
import { useModal } from '@/contexts/ModalContext';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ConfirmModal from '../molecules/ConfirmModal';

function Modal({ children, ...props }) {
  const modals = useModal();
  const [closing, setClosing] = useState(false);

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

  const defaultClassNames = clsx({
    'w-[1160px] h-[90vh] px-[120px] py-[60px]': true,
  });

  const mdClassNames = clsx({
    'md:w-full md:h-full md:px-5 md:pt-2 md:top-9 md:max-h-[96vh] ': true,
  });

  const smClassNames = clsx({
    'sm:w-full sm:h-full sm:px-5 sm:pt-4 sm:top-0 sm:max-h-[100vh] ': true,
  });

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center"
      onClick={handleClickModalOutside}
    >
      <div
        ref={props.ref}
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          defaultClassNames,
          mdClassNames,
          smClassNames,
          'fixed bg-[#161616] overflow-y-auto'
        )}
      >
        <div className="relative md:hidden">
          <button
            className="absolute -right-20 -top-6 z-30"
            onClick={modals.close}
          >
            <Image alt="모달창 닫기" src={iconX} width={32} height={32} />
          </button>
        </div>
        <div
          className="hidden md:block sm:hidden text-center pt-0 pb-5 cursor-pointer"
          onClick={modals.close}
        >
          <button className="bg-[#5a5a5a] w-12 h-2 rounded-lg"></button>
        </div>
        <div
          className="hidden sm:block absolute py-1 cursor-pointer"
          onClick={modals.close}
        >
          <Image src={iconLess} width={14} height={22} alt={'less'} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
