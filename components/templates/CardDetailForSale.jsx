import React from 'react';
import Detail from './Detail';
import Title from '../molecules/Title';
import Image from 'next/image';
import GradeCardBadge from '../atoms/GradeCardBadge';
import Divider from '../atoms/Divider';
import CardDetail from '../organisms/CardDetail';
import InputDropdown from '../molecules/InputDropdown';
import { useForm } from 'react-hook-form';
import constants from '@/constant/index';
import InputTextBox from '../molecules/InputTextBox';
import Button from '../atoms/Button';
import { useModal } from '@/contexts/ModalContext';
import { useRouter } from 'next/navigation';
import shopsApi from '@/api/shops/shops.api';

function CardDetailForSale({ card, onBack }) {
  const { id, imgUrl, name, grade, genre, nickname, reserveCount, price } =
    card;
  const modal = useModal();
  const router = useRouter();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      quantity: 0,
      price: 0,
      rank: '',
      genre: '',
      description: '',
    },
  });

  const { mutate: createShop } = useMutation({
    mutationFn: (data) => shopsApi.createShop(data),
    onSuccess: () => {
      modal.close();
      router.push();
    },
  });

  const handleCreateClick = (dto) => {
    console.log(dto);
  };

  return (
    <form onSubmit={handleSubmit(handleCreateClick)}>
      <h3 onClick={onBack} className="font-baskin text-[#A4A4A4] text-[24px]">
        {'< '} 나의 포토카드 판매하기
      </h3>
      <Title intent="md" className={'mt-10 mb-12'}>
        {name}
      </Title>
      <div className="flex gap-10 mb-20">
        <Image src={imgUrl} width={440} height={330} alt={'카드 이미지'} />
        <div>
          <CardDetail
            cardDetail={card}
            topIntent={'myCardDetail'}
            bottomIntent={'exchange'}
            dataId={id}
            bgColor={'none'}
            control={control}
            nameForQuantity={'quantity'}
            nameForPrice={'price'}
          />
          <p className="font-thin text-sm text-right">출시가 : {price}p</p>
        </div>
      </div>
      <Title intent="sm">교환 희망 정보</Title>
      <div className="flex justify-between mt-12 mb-5">
        <InputDropdown
          control={control}
          name={'rank'}
          label={'등급'}
          size={'md'}
          options={constants.GRADE_OPTIONS}
          placeholder={'등급을 선택해 주세요'}
        />
        <InputDropdown
          control={control}
          name={'genre'}
          label={'장르'}
          size={'md'}
          options={constants.GENRE_OPTIONS}
          placeholder={'장르을 선택해 주세요'}
        />
      </div>
      <InputTextBox
        control={control}
        name={'description'}
        label={'교환 희망 설명'}
        size={'full'}
        placeholder={'설명을 입력해 주세요.'}
      />
      <div className="flex gap-10 mt-14">
        <Button intent="secondary" onClick={() => modal.close()}>
          취소하기
        </Button>
        <Button intent="primary">판매하기</Button>
      </div>
    </form>
  );
}

export default CardDetailForSale;
