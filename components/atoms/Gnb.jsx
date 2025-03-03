'use client';

import notificationsApi from '@/api/notifications/notifications.api';
import usersApi from '@/api/users/users.api';
import icMenu from '@/assets/images/ic-menu.png';
import icNotification from '@/assets/images/ic-notification.png';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  return (
    <header className="bg-[#0f0f0f] sticky z-20 top-0 flex justify-center">
      <div className="w-full h-20 md:h-[70px] sm:h-[60px] max-w-[1480px] flex justify-between items-center mx-16 md:mx-5 sm:mx-4">
        <button
          className="hidden sm:block"
          onClick={() => setShowPointMenu(!showPointMenu)}
        >
          <Image src={icMenu} alt="메뉴" className="w-[22px]" />
        </button>
        <Link href={'/'}>
          <Logo />
        </Link>
        {/* 포인트 팝업 위치 조정을 위한 div 열기 -김주영 */}
        <div className="relative">
          {isAuthInitialized &&
            (isLoggedIn ? (
              <div className="flex items-center">
                {/* 포인트 텍스트 컨테이너 시작 - 김주영*/}
                <p className="text-sm font-bold mr-6 sm:hidden">
                  {user ? user.point : ''}P
                </p>
                {/* 포인트 텍스트 컨테이너 끝 - 김주영*/}
                <div className="relative">
                  {/* 알림팝업 호출 start - 주영  */}
                  <Image
                    src={icNotification}
                    alt="알림아이콘"
                    className="w-6 sm:w-[22px] mr-6 sm:mr-0 cursor-pointer"
                    onClick={() => setShowNotification(!showNotification)}
                  />
                  <NotificationPopup
                    isOpen={showNotification}
                    setIsOpen={setShowNotification}
                    notifications={notifications}
                  />
                  {/* 알림팝업 호출 end - 김주영  */}
                </div>
                <p
                  className="font-baskin text-lg mr-6 cursor-pointer sm:hidden"
                  onClick={() => setShowPointMenu(!showPointMenu)}
                >
                  {user ? user.nickname : ''}
                </p>
                <div className="w-[1px] h-5 bg-[#5a5a5a] mr-6 sm:hidden"></div>
                <p
                  className="text-sm text-[#5a5a5a] cursor-pointer sm:hidden hover:brightness-75 active:brightness-50"
                  onClick={handleClickLogout}
                >
                  로그아웃
                </p>
              </div>
            ) : (
              <div className="flex items-center sm:w-[22px]">
                <p
                  className="text-sm mr-6 sm:hidden cursor-pointer hover:brightness-75 active:brightness-50"
                  onClick={handleClickLogin}
                >
                  로그인
                </p>
                <p
                  className="text-sm sm:hidden cursor-pointer hover:brightness-75 active:brightness-50"
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
    </header>
  );
}

export default Gnb;
