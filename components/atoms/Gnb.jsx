import icNotification from "@/assets/images/ic-notification.png";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

function Gnb({ isLoggedIn = false }) {
  return (
    <header className="sticky z-10 top-0 flex justify-center">
      <div className="w-full h-20 max-w-[1480px] flex justify-between items-center mx-[200px]">
        <Image src={logo} alt="로고" className="w-[140px]" />
        {isLoggedIn ? (
          <div className="flex items-center">
            <p className="text-sm font-bold mr-6">1,540P</p>
            <Image src={icNotification} alt="알림아이콘" className="w-6 mr-6" />
            <p className="font-baskin text-lg mr-6">유디</p>
            <div className="w-[1px] h-5 bg-[#5a5a5a] mr-6"></div>
            <p className="text-sm text-[#5a5a5a]">로그아웃</p>
          </div>
        ) : (
          <div className="flex items-center">
            <p className="text-sm mr-6">로그인</p>
            <p className="text-sm">회원가입</p>
          </div>
        )}
      </div>
    </header>
  );
}

export default Gnb;
