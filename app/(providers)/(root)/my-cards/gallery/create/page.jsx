'use client';

import cardsApi from '@/api/cards/cards.api';
import Button from '@/components/atoms/Button';
import PageContainer from '@/components/atoms/PageContainer';
import InputDropdown from '@/components/molecules/InputDropdown';
import InputText from '@/components/molecules/InputText';
import InputTextBox from '@/components/molecules/InputTextBox';
import InputUpload from '@/components/molecules/InputUpload';
import Title from '@/components/molecules/Title';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const gradeOptions = [
  { value: 'COMMON', label: 'COMMON' },
  { value: 'RARE', label: 'RARE' },
  { value: 'SUPER RARE', label: 'SUPER RARE' },
  { value: 'LEGENDARY', label: 'LEGENDARY' },
];
const genreOptions = [
  { value: '풍경', label: '풍경' },
  { value: '인물', label: '인물' },
  { value: '사물', label: '사물' },
  { value: '여행', label: '여행' },
];

function CreateCardPage() {
  const { control, handleSubmit, getValues } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      grade: '',
      genre: '',
      price: 1,
      issuedQuantity: 1,
      imgUrl: undefined,
      description: '',
    },
  });

  const router = useRouter();

  const { mutate: createCard, isPending } = useMutation({
    mutationFn: (data) => cardsApi.createCard(data),
    onSuccess: () => {
      const { name, grade } = getValues();

      router.push(
        `/result?intent=createCard&&isSuccess=true&&name=${name}&&grade=${grade}`
      );
    },
    onError: () => {
      const { name, grade } = getValues();

      router.push(
        `/result?intent=createCard&&isSuccess=false&&name=${name}&&grade=${grade}`
      );
    },
  });

  const handleClickCreate = (dto) => {
    createCard(dto);
  };

  return (
    <PageContainer>
      <Title className="sm:hidden">포토카드 생성</Title>
      <div className="flex justify-center mt-20 md:mt-14 sm:mt-5">
        <form onSubmit={handleSubmit(handleClickCreate)}>
          <div className="mb-[30px]">
            <InputText
              control={control}
              type="text"
              name="name"
              label="포토카드 이름"
              placeholder="포토카드 이름을 입력해 주세요"
              rules={{
                required: '포토카드 이름을 입력해 주세요',
                minLength: {
                  value: 2,
                  message: '포토카드 이름을 2글자 이상 입력해 주세요',
                },
                maxLength: {
                  value: 30,
                  message: '포토카드 이름을 30글자 이내로 입력해 주세요',
                },
              }}
            />
          </div>
          <div className="mb-[30px] cursor-pointer">
            <InputDropdown
              control={control}
              name={'grade'}
              label={'등급'}
              placeholder={'등급을 선택해 주세요.'}
              options={gradeOptions}
            />
          </div>
          <div className="mb-[30px] cursor-pointer">
            <InputDropdown
              control={control}
              name={'genre'}
              label={'장르'}
              placeholder={'장르를 선택해 주세요.'}
              options={genreOptions}
            />
          </div>
          <div className="mb-[30px]">
            <InputText
              control={control}
              type="text"
              name="price"
              label="가격"
              placeholder="가격을 입력해 주세요"
              rules={{
                required: '가격을 입력해 주세요',
                validate: {
                  isNumber: (value) => {
                    return Number.isInteger(Number(value))
                      ? true
                      : '숫자만 입력해 주세요';
                  },
                },
              }}
            />
          </div>
          <div className="mb-[30px]">
            <InputText
              control={control}
              type="text"
              name="issuedQuantity"
              label="총 발행량"
              placeholder="총 발행량을 입력해 주세요"
              rules={{
                required: '총 발행량을 입력해 주세요',
                validate: {
                  isNumber: (value) => {
                    return Number.isInteger(Number(value))
                      ? true
                      : '숫자만 입력해 주세요';
                  },
                },
              }}
            />
          </div>
          <div className="mb-[30px]">
            <InputUpload
              control={control}
              name={'imgUrl'}
              label={'사진 업로드'}
              placeholder={'사진 업로드'}
            />
          </div>
          <div className="mb-[30px]">
            <InputTextBox
              control={control}
              size={'lg'}
              name={'description'}
              label={'포토카드 설명'}
              placeholder={'카드 설명을 입력해 주세요.'}
              rules={{
                required: '카드 설명은 필수 입력입니다.',
                maxLength: {
                  value: 300,
                  message: '300자 이하만 입력 가능합니다.',
                },
              }}
            />
          </div>
          <Button
            intent={'primary'}
            isPending={isPending}
            size="h55"
            className="lg:h-[60px] text-lg"
          >
            생성하기
          </Button>
        </form>
      </div>
    </PageContainer>
  );
}

export default CreateCardPage;
