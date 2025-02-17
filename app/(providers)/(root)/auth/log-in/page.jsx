'use client';

import logo from '@/assets/images/logo.png';
import Button from '@/components/atoms/Button';
import Image from 'next/image';

function LoginPage() {
  return (
    <div className="h-[100vh] flex justify-center items-center bg-[#0f0f0f]">
      <div className="w-[520px]">
        <Image src={logo} alt="로고" className="w-[330px]" />
        <form className="w-full">
          <div className="inline-flex flex-col w-full">
            <label>이메일</label>
            <input type="email" id="email" />
            <label>비밀번호</label>
            <input type="password" id="password" />
          </div>
          <div>
            <Button intent="primary">로그인</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
