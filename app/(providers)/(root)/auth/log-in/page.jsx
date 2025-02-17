'use client';

import Button from '@/components/atoms/Button';
import Logo from '@/components/atoms/Logo';
import { useAuth } from '@/contexts/AuthContext';

function LoginPage() {
  const { login } = useAuth();
  const handleClickLogin = () => {
    login();
  };
  return (
    <div className="h-[100vh] flex justify-center items-center bg-[#0f0f0f]">
      <div className="w-[520px]">
        <Logo intent="auth" />
        <form className="w-full">
          <div className="inline-flex flex-col w-full">
            <label>이메일</label>
            <input type="email" id="email" />
            <label>비밀번호</label>
            <input type="password" id="password" />
          </div>
          <div>
            <Button type="button" intent="primary" onClick={handleClickLogin}>
              로그인
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
