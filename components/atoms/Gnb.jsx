'use client';

import usersApi from '@/api/users/users.api';
import icMenu from '@/assets/images/ic-menu.png';
import icNotification from '@/assets/images/ic-notification.png';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from './Logo';

function Gnb() {
  const { isLoggedIn, logout, isAuthInitialized } = useAuth();
  const router = useRouter();

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: usersApi.getMe,
  });

  const handleClickLogin = () => {
    router.push('/auth/log-in');
  };
  const handleClickSignUp = () => {
    router.push('/auth/sign-up');
  };
  const handleClickLogout = () => {
    logout();
  };

  return (
    <header className="bg-[#0f0f0f] sticky z-10 top-0 flex justify-center">
      <div className="w-full h-20 md:h-[70px] sm:h-[60px] max-w-[1480px] flex justify-between items-center mx-16 md:mx-5 sm:mx-4">
        <Image
          src={icMenu}
          alt="메뉴"
          className="w-[22px] lg:hidden md:hidden"
        />
        <Link href={'/'}>
          <Logo />
        </Link>
        {isAuthInitialized &&
          (isLoggedIn ? (
            <div className="flex items-center">
              <Link href="/my-cards/sales">
                <p className="text-sm font-bold mr-6 sm:hidden">
                  {user ? user.point : ''}P
                </p>
              </Link>
              <Image
                src={icNotification}
                alt="알림아이콘"
                className="w-6 sm:w-[22px] mr-6 sm:mr-0"
              />
              <Link href="/my-cards/gallery">
                <p className="font-baskin text-lg mr-6 sm:hidden">
                  {user ? user.nickname : ''}
                </p>
              </Link>
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
      </div>
    </header>
  );
}

export default Gnb;
