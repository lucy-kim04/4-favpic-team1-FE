import icMenu from '@/assets/images/ic-menu.png';
import icNotification from '@/assets/images/ic-notification.png';
import logo from '@/assets/images/logo.png';
import Image from 'next/image';

function Gnb({ isLoggedIn = true }) {
  return (
    <header className="sticky z-10 top-0 flex justify-center">
      <div className="w-full h-20 md:h-[70px] sm:h-[60px] max-w-[1480px] flex justify-between items-center mx-[200px] md:mx-10 sm:mx-5">
        <Image
          src={icMenu}
          alt="메뉴"
          className="w-[22px] lg:hidden md:hidden"
        />
        <Image
          src={logo}
          alt="로고"
          className="w-[140px] md:w-[111px] sm:w-[84px]"
        />
        {isLoggedIn ? (
          <div className="flex items-center">
            <p className="text-sm font-bold mr-6 sm:hidden">1,540P</p>
            <Image
              src={icNotification}
              alt="알림아이콘"
              className="w-6 sm:w-[22px] mr-6 sm:mr-0"
            />
            <p className="font-baskin text-lg mr-6 sm:hidden">유디</p>
            <div className="w-[1px] h-5 bg-[#5a5a5a] mr-6 sm:hidden"></div>
            <p className="text-sm text-[#5a5a5a] sm:hidden">로그아웃</p>
          </div>
        ) : (
          <div className="flex items-center sm:w-[22px]">
            <p className="text-sm mr-6 sm:hidden">로그인</p>
            <p className="text-sm sm:hidden">회원가입</p>
          </div>
        )}
      </div>
    </header>
  );
}

export default Gnb;
