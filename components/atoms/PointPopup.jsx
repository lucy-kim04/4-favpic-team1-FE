'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Button from './Button';
import Divider from './Divider';

function PointPopup({ isOpen, setIsOpen, user, onLogin, onSignUp, onLogout }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  return (
    <>
      {/* 딤드 처리 */}
      <div
        className={`
          fixed inset-0 bg-black z-30
          ${
            isOpen
              ? 'opacity-50 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }
          transition-opacity duration-300 ease-in-out
          hidden sm:block
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* 메뉴 컨텐츠 내용 */}
      <div
        ref={menuRef}
        className={`
        absolute sm:fixed top-16 sm:top-0 right-0 sm:left-0 
        w-[260px] sm:h-full 
        bg-[#161616] rounded-xl sm:rounded-none shadow-lg p-0 z-40
        ${
          isOpen
            ? 'opacity-100 sm:translate-x-0'
            : 'opacity-0 sm:-translate-x-full pointer-events-none'
        }
        transition-opacity sm:transition-transform duration-300 ease-in-out
      `}
      >
        {user ? (
          <>
            <div className='px-6 pt-6 sm:mt-5'>
              <p className='font-bold text-lg text-white mb-5'>
                안녕하세요, {user.nickname}님!
              </p>
              <div className='flex justify-between pb-[10px]'>
                <p className='text-sm text-[#5a5a5a]'>보유포인트</p>
                <p className='text-sm text-[#EFFF04]'>{user.point}P</p>
              </div>
            </div>
            <Divider />
            <div className='px-6 pb-6'>
              <ul className='flex flex-col gap-[10px] pt-[10px]'>
                <Link href='/my-cards/gallery'>
                  <li className='text-sm text-white cursor-pointer'>
                    마이갤러리
                  </li>
                </Link>
                <Link href='/my-cards/sales'>
                  <li className='text-sm text-white cursor-pointer'>
                    나의 판매 포토카드
                  </li>
                </Link>
              </ul>
              <p
                className='absolute bottom-10 text-sm text-[#5a5a5a] cursor-pointer hover:brightness-75 active:brightness-50 md:hidden lg:hidden'
                onClick={onLogout}
              >
                로그아웃
              </p>
            </div>
          </>
        ) : (
          <div className='p-6 md:hidden lg:hidden'>
            <p className='text-lg text-white mb-5'>로그인이 필요해요</p>
            <p className='text-sm text-[#a4a4a4] mb-6'>
              포토카드 구매, 판매, 교환 서비스 이용은 로그인 회원만 이용할 수
              있어요.
            </p>
            <div className='flex flex-col gap-3'>
              <Button onClick={onLogin} size='h40'>
                로그인
              </Button>
              <Button onClick={onSignUp} size='h40' intent='secondary'>
                회원가입
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PointPopup;
