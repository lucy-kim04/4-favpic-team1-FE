'use client';

import { useModal } from '@/contexts/ModalContext';
import iconX from '@/assets/images/ic-x.png';
import Image from 'next/image';

function Modal({ children }) {
  const modal = useModal();

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 flex items-center justify-center z-20">
      <div className="fixed top-10 bg-[#161616] w-[1160px] h-[1000px] px-[120px] py-[60px]">
        <button
          className="absolute left-[1098px] top-[30px]"
          onClick={modal.close}
        >
          <Image alt="모달창 닫기" src={iconX} width={32} height={32} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
