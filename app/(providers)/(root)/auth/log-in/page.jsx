'use client';

import usersApi from '@/api/users/users.api';
import Button from '@/components/atoms/Button';
import Logo from '@/components/atoms/Logo';
import PageContainer from '@/components/atoms/PageContainer';
import InputPassword from '@/components/molecules/InputPassword';
import InputText from '@/components/molecules/InputText';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

function LoginPage() {
  const { login: authLogin } = useAuth();
  const router = useRouter();
  const { handleSubmit, control, setError } = useForm({
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
  });

  const queryClient = useQueryClient();

  const { mutate: login } = useMutation({
    mutationFn: (data) => usersApi.logIn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      router.replace('/');
      authLogin();
    },
    onError: (error) => {
      const errorMessage = error.response.data;
      console.log(errorMessage);
      if (errorMessage === 'Non existing user') {
        setError('email', { message: '존재하지 않는 이메일입니다' });
      } else if (errorMessage === 'Wrong password') {
        setError('password', { message: '비밀번호가 일치하지 않습니다' });
      } else {
        alert('에러가 발생했습니다. 다시 시도해 주세요.');
      }
    },
  });

  const handleClickLogin = (dto) => {
    login(dto);
  };

  return (
    <PageContainer>
      <div className="flex justify-center items-center bg-[#0f0f0f]">
        <div className="w-[520px] md:w-[440px] sm:[345px]">
          <div className="flex justify-center mb-20">
            <Logo intent="auth" />
          </div>
          <form className="w-full" onSubmit={handleSubmit(handleClickLogin)}>
            <div className="inline-flex flex-col w-full">
              <div className="mb-[30px]">
                <InputText
                  control={control}
                  type="email"
                  name="email"
                  label="이메일"
                  placeholder="이메일을 입력해 주세요"
                  rules={{
                    required: '이메일을 입력해 주세요',
                    pattern: {
                      value:
                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                      message: '잘못된 이메일 형식입니다',
                    },
                  }}
                />
              </div>
              <div className="mb-10">
                <InputPassword
                  control={control}
                  name={'password'}
                  label={'비밀번호'}
                  placeholder={'비밀번호를 입력해 주세요'}
                  rules={{
                    required: '비밀번호를 입력해 주세요',
                    minLength: {
                      value: 8,
                      message: '비밀번호를 8자 이상 입력해 주세요',
                    },
                  }}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                intent="primary"
                className="sm:h-[55px] md:h-[55px]"
              >
                로그인
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}

export default LoginPage;
