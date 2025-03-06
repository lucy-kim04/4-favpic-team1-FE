'use client';

import usersApi from '@/api/users/users.api';
import Button from '@/components/atoms/Button';
import Loader from '@/components/atoms/Loader';
import Logo from '@/components/atoms/Logo';
import PageContainer from '@/components/atoms/PageContainer';
import InputPassword from '@/components/molecules/InputPassword';
import InputText from '@/components/molecules/InputText';
import PointDrawModal from '@/components/molecules/PointDrawModal';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function SignUpPage() {
  const { login: authLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const queryClient = useQueryClient();

  const router = useRouter();
  const modal = useModal();
  const { handleSubmit, control, getValues, setError } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const { mutate: signUp, isPending: isPendingSignUp } = useMutation({
    mutationFn: (data) => usersApi.singUp(data),
    onSuccess: () => {
      // 회원가입 성공 시 자동으로 로그인 시키기
      login({ email, password });
      // 랜덤 포인트 추첨 팝업 띄우기
      setTimeout(() => modal.open(<PointDrawModal />), 2000);
    },
    onError: (error) => {
      const errorMessage = error.response.data;
      console.log(errorMessage);
      if (errorMessage === 'Email already in use') {
        setError('email', { message: '이미 사용중인 이메일입니다' });
      } else if (errorMessage === 'Nickname already in use') {
        setError('nickname', { message: '이미 사용중인 닉네임입니다' });
      } else {
        alert('에러가 발생했습니다. 다시 시도해 주세요.');
      }
    },
  });

  const { mutate: login, isPending: isPendingLogIn } = useMutation({
    mutationFn: (data) => usersApi.logIn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      router.replace('/');
      authLogin();
    },
  });

  const handleClickLogin = (dto) => {
    setEmail(dto.email);
    setPassword(dto.password);
    signUp(dto);
  };

  return (
    <PageContainer>
      <div className="flex justify-center items-center bg-[#0f0f0f]">
        <div className="w-[345px] md:w-[440px] lg:w-[520px]">
          <div className="mb-20 flex justify-center">
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
              <div className="mb-[30px]">
                <InputText
                  control={control}
                  type="text"
                  name="nickname"
                  label="닉네임"
                  placeholder="닉네임을 입력해 주세요"
                  rules={{
                    required: '닉네임을 입력해 주세요',
                    minLength: {
                      value: 2,
                      message: '닉네임을 2글자 이상 입력해 주세요',
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
              <div className="mb-10">
                <InputPassword
                  control={control}
                  name={'passwordConfirm'}
                  label={'비밀번호 확인'}
                  placeholder={'비밀번호를 다시 한 번 입력해 주세요'}
                  rules={{
                    required: '비밀번호를 다시 한 번 입력해주세요',
                    validate: {
                      isPasswordNotMatch: () => {
                        const {
                          password: passwordValue,
                          passwordConfirm: passwordConfirmValue,
                        } = getValues();
                        return (
                          passwordValue === passwordConfirmValue ||
                          '비밀번호가 일치하지 않습니다'
                        );
                      },
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
                {isPendingSignUp || isPendingLogIn ? <Loader /> : '회원가입'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}

export default SignUpPage;
