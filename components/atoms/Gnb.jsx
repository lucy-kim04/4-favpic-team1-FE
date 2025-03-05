'use client';

import notificationsApi from '@/api/notifications/notifications.api';
import usersApi from '@/api/users/users.api';
import arrowLeftWhite from '@/assets/images/arrow-left-white.png';
import icMenu from '@/assets/images/ic-menu.png';
import icNotification from '@/assets/images/ic-notification.png';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Logo from './Logo';
import NotificationPopup from './NotificationPopup';
import PointPopup from './PointPopup';

function Gnb() {
  // 포인트,알람 팝업 state 추가 -김주영
  const [showNotification, setShowNotification] = useState(false);
  const [showPointMenu, setShowPointMenu] = useState(false);
  const { isLoggedIn, logout, isAuthInitialized } = useAuth();
  const router = useRouter();

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: usersApi.getMe,
  });

  // useQuery로 getNotificationsOfMe를 받아서
  // notifications를 NotificationPopup에 전달 - 조형민
  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsApi.getNotificationsOfMe,
  });

  const notifications = data || [];

  const handleClickLogin = () => {
    router.push('/auth/log-in');
  };
  const handleClickSignUp = () => {
    router.push('/auth/sign-up');
  };
  const handleClickLogout = () => {
    logout();
    setShowPointMenu(false);
  };

  const isNotReadCount = notifications.filter(
    (notification) => notification.isRead === false
  ).length;

  //모바일 사이즈에서 GNB 스왑 처리
  const pathname = usePathname();
  const isMainPage = pathname === '/' || pathname.match(/^\/[0-9a-f-]+$/);

  //모바일 사이즈용 페이지 타이틀 맵핑하기 include는 하위까지 적용되서 with로 처리
  const getMobilePageTitle = (pathname) => {
    if (pathname === '/my-cards/gallery/create') return '포토카드 생성하기';
    if (pathname.startsWith('/my-cards/gallery')) return '마이갤러리';
    if (pathname.startsWith('/my-cards/sales')) return '나의 판매 포토카드';
    if (pathname === '/auth/log-in') return '로그인';
    if (pathname === '/auth/sign-up') return '회원가입';
    if (pathname === '/result') return '';
    return '';
  };

  return (
    <header className='bg-[#0f0f0f] sticky z-20 top-0 flex justify-center'>
      {isMainPage ? (
        <>
          <div className='w-full h-20 md:h-[70px] sm:h-[60px] max-w-[1480px] flex justify-between items-center mx-16 md:mx-5 sm:mx-4'>
            <button
              className='hidden sm:block'
              onClick={() => setShowPointMenu(!showPointMenu)}
            >
              <Image src={icMenu} alt='메뉴' className='w-[22px]' />
            </button>
            <Link href={'/'}>
              <Logo />
            </Link>
            {/* 포인트 팝업 위치 조정을 위한 div 열기 -김주영 */}
            <div className='relative'>
              {isAuthInitialized &&
                (isLoggedIn ? (
                  <div className='flex items-center'>
                    {/* 포인트 텍스트 컨테이너 시작 - 김주영*/}
                    <p className='text-sm font-bold mr-6 sm:hidden'>
                      {user ? user.point : ''}P
                    </p>
                    {/* 포인트 텍스트 컨테이너 끝 - 김주영*/}
                    <div className='relative'>
                      {/* 알림팝업 호출 start - 주영  */}
                      <div className='relative w-6 h-6 mr-6 flex justify-center items-center'>
                        <Image
                          src={icNotification}
                          alt='알림아이콘'
                          className={`w-[19px] sm:mr-0 ${
                            notifications.length > 0
                              ? 'cursor-pointer brightness-100'
                              : 'cursor-not-allowed brightness-50'
                          }`}
                          onClick={() =>
                            notifications.length > 0 &&
                            setShowNotification(!showNotification)
                          }
                        />
                        {isNotReadCount !== 0 && (
                          <div className='w-2 h-2 bg-[#ff483d] absolute right-[2px] top-[2px] rounded-full z-20 text-[6px] font-bold flex justify-center items-center'>
                            {isNotReadCount}
                          </div>
                        )}
                      </div>
                      <NotificationPopup
                        isOpen={showNotification}
                        setIsOpen={setShowNotification}
                        notifications={notifications}
                      />
                      {/* 알림팝업 호출 end - 김주영  */}
                    </div>
                    <p
                      className='font-baskin text-lg mr-6 cursor-pointer sm:hidden'
                      onClick={() => setShowPointMenu(!showPointMenu)}
                    >
                      {user ? user.nickname : ''}
                    </p>
                    <div className='w-[1px] h-5 bg-[#5a5a5a] mr-6 sm:hidden'></div>
                    <p
                      className='text-sm text-[#5a5a5a] cursor-pointer sm:hidden hover:brightness-75 active:brightness-50'
                      onClick={handleClickLogout}
                    >
                      로그아웃
                    </p>
                  </div>
                ) : (
                  <div className='flex items-center sm:w-[22px]'>
                    <p
                      className='text-sm mr-6 sm:hidden cursor-pointer hover:brightness-75 active:brightness-50'
                      onClick={handleClickLogin}
                    >
                      로그인
                    </p>
                    <p
                      className='text-sm sm:hidden cursor-pointer hover:brightness-75 active:brightness-50'
                      onClick={handleClickSignUp}
                    >
                      회원가입
                    </p>
                  </div>
                ))}
              {/* 포인트팝업 컴포넌트 호출 -김주영 */}
              <PointPopup
                isOpen={showPointMenu}
                setIsOpen={setShowPointMenu}
                user={user}
                onLogin={handleClickLogin}
                onSignUp={handleClickSignUp}
                onLogout={handleClickLogout}
              />
              {/* 포인트 팝업 위치 조정을 위한 div 닫기 -김주영 */}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='hidden h-[60px] p-5 sm:flex items-center justify-between w-full'>
            <button onClick={() => router.back()}>
              <Image
                src={arrowLeftWhite}
                alt='뒤로가기'
                width={24}
                height={24}
              />
            </button>
            <h1 className='text-lg font-bold absolute left-1/2 transform -translate-x-1/2'>
              {getMobilePageTitle(pathname)}
            </h1>
          </div>
          <div className='w-full h-20 md:h-[70px] sm:h-[60px] max-w-[1480px] flex justify-between items-center mx-16 md:mx-5 sm:hidden'>
            <Link href={'/'}>
              <Logo />
            </Link>
            <div className='relative'>
              {isAuthInitialized &&
                (isLoggedIn ? (
                  <div className='flex items-center'>
                    <p className='text-sm font-bold mr-6 sm:hidden'>
                      {user ? user.point : ''}P
                    </p>
                    <div className='relative'>
                      <div className='relative w-6 h-6 mr-6 flex justify-center items-center'>
                        <Image
                          src={icNotification}
                          alt='알림아이콘'
                          className='w-[19px] sm:mr-0 cursor-pointer'
                          onClick={() => setShowNotification(!showNotification)}
                        />
                        {isNotReadCount !== 0 && (
                          <div className='w-2 h-2 bg-[#ff483d] absolute right-[2px] top-[2px] rounded-full z-20 text-[6px] font-bold flex justify-center items-center'>
                            {isNotReadCount}
                          </div>
                        )}
                      </div>
                      <NotificationPopup
                        isOpen={showNotification}
                        setIsOpen={setShowNotification}
                        notifications={notifications}
                      />
                    </div>
                    <p
                      className='font-baskin text-lg mr-6 cursor-pointer sm:hidden'
                      onClick={() => setShowPointMenu(!showPointMenu)}
                    >
                      {user ? user.nickname : ''}
                    </p>
                    <div className='w-[1px] h-5 bg-[#5a5a5a] mr-6 sm:hidden'></div>
                    <p
                      className='text-sm text-[#5a5a5a] cursor-pointer sm:hidden hover:brightness-75 active:brightness-50'
                      onClick={handleClickLogout}
                    >
                      로그아웃
                    </p>
                  </div>
                ) : (
                  <div className='flex items-center sm:w-[22px]'>
                    <p
                      className='text-sm mr-6 sm:hidden cursor-pointer hover:brightness-75 active:brightness-50'
                      onClick={handleClickLogin}
                    >
                      로그인
                    </p>
                    <p
                      className='text-sm sm:hidden cursor-pointer hover:brightness-75 active:brightness-50'
                      onClick={handleClickSignUp}
                    >
                      회원가입
                    </p>
                  </div>
                ))}
              <PointPopup
                isOpen={showPointMenu}
                setIsOpen={setShowPointMenu}
                user={user}
                onLogin={handleClickLogin}
                onSignUp={handleClickSignUp}
                onLogout={handleClickLogout}
              />
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Gnb;
