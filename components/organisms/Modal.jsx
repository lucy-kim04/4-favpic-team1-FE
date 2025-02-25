'use client';

import { useModal } from '@/contexts/ModalContext';
import iconX from '@/assets/images/ic-x.png';
import Image from 'next/image';
import { useEffect } from 'react';

function Modal({ children, ...props }) {
  const modal = useModal();

  // 모달이 열릴 때 body 스크롤 잠금
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/80 flex items-center justify-center z-20">
      <button
        className="absolute right-[400px] top-[60px] z-10"
        onClick={modal.close}
      >
        <Image alt="모달창 닫기" src={iconX} width={32} height={32} />
      </button>
      <div
        ref={props.ref}
        className="fixed top-10 bg-[#161616] w-[1160px] h-[1000px] px-[120px] py-[60px] max-h-[90vh] overflow-y-auto"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
