'use client';

import { createContext, useContext, useState } from 'react';

const ModalContext = createContext({});

export const useModal = () => useContext(ModalContext);

// 모달을 중첩해서 사용할 수 있도록 리팩토링
export function ModalProvider({ children }) {
  // 모달 요소들을 배열로 관리
  const [modalElements, setModalElements] = useState([]);

  // 새 모달을 열 때는 배열에 추가
  const open = (element) => setModalElements((prev) => [...prev, element]);

  // 모달을 닫을 때는 마지막 모달을 배열에서 제거
  const close = () =>
    setModalElements((prev) => prev.slice(0, prev.length - 1));

  // 모든 모달을 닫고 싶으면 배열을 빈 배열로 설정
  const closeAll = () => setModalElements([]);

  const value = { modalElements, open, close, closeAll };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalElements.map((ModalComponent, index) => (
        //각 모달에는 고유의 key와 높은 z-index를 부여하여 쌓임
        <div
          key={index}
          className={`fixed inset-0`}
          style={{ zIndex: 1000 + index }}
        >
          {ModalComponent}
        </div>
      ))}
    </ModalContext.Provider>
  );
}

// export function ModalProvider({ children }) {
//   const [modalElement, setModalElement] = useState();

//   const open = (element) => setModalElement(element);
//   const close = () => setModalElement(null);

//   const value = { open, close };

//   return (
//     <ModalContext.Provider value={value}>
//       {children}
//       {modalElement}
//     </ModalContext.Provider>
//   );
// }
