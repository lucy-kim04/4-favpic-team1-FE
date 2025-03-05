import shopsApi from '@/api/shops/shops.api';
import imgLess from '@/assets/images/ic-less.png';
import constants from '@/constant/index';
import { useModal } from '@/contexts/ModalContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../atoms/Button';
import InputDropdown from '../molecules/InputDropdown';
import InputTextBox from '../molecules/InputTextBox';
import Title from '../molecules/Title';
import CardDetail from '../organisms/CardDetail';

function CardDetailModalForSale({ card, onBack, intent = 'sale', shopId }) {
  const { id, imgUrl, name, grade, genre, nickname, reserveCount, price } =
    card;
  const modal = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      quantity: 1,
      price: '',
      rank: '',
      genre: '',
      description: '',
    },
  });

  const { data: shopData, isLoading } = useQuery({
    queryKey: ['shop', { shopId }],
    queryFn: () => shopsApi.getShop(shopId),
    enabled: intent !== 'sale' ? true : false,
    refetchOnMount: true,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (shopData) {
      reset({
        quantity: shopData.availableQuantity,
        price: shopData.price,
        rank: shopData.exchangeGrade,
        genre: shopData.exchangeGenre,
        description: shopData.exchangeDesc,
      });
    }
  }, [shopData, reset]);

  const { mutate: createShop, isPending } = useMutation({
    mutationFn: (data) => shopsApi.createShop(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['shop']);
      router.push(
        `/result?intent=createShop&&isSuccess=true&&grade=${grade}&&name=${name}&&count=${data.salesCount}`
      );
      setTimeout(() => {
        modal.close();
      }, 1000);
    },
  });

  const { mutate: updateShop } = useMutation({
    mutationFn: (data) => shopsApi.updateShop(shopId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['shop']);
      router.push(
        `/result?intent=updateShop&&isSuccess=true&&grade=${grade}&&name=${name}&&count=${data.salesCount}`
      );
      setTimeout(() => {
        modal.close();
      }, 1000);
    },
  });

  const handleCreateClick = (dto) => {
    const { quantity, price, rank, genre, description } = dto;
    const formData = {
      cardId: id,
      salesCount: quantity,
      price: Number(price),
      exchangeGrade: rank,
      exchangeGenre: genre,
      exchangeDesc: description,
    };
    createShop(formData);
  };

  const handleEditClick = (dto) => {
    const { quantity, price, rank, genre, description } = dto;
    const formData = {
      countToEdit: quantity,
      price: Number(price),
      exchangeGrade: rank,
      exchangeGenre: genre,
      exchangeDesc: description,
      remainingCount: shopData.remainingCount,
    };

    updateShop(formData);
  };
  const onSubmit = intent === 'sale' ? handleCreateClick : handleEditClick;

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:mx-10">
      <h3
        onClick={onBack}
        className={`font-baskin text-[#A4A4A4] text-[24px] sm:text-white sm:text-center sm:text-xl ${
          intent === 'sale' ? 'cursor-pointer' : ''
        }`}
      >
        <Image
          src={imgLess}
          width={12}
          height={22}
          alt={'less'}
          className="sm:hidden inline-block py-1 mr-3"
        />
        {intent === 'sale' ? '소유중인 카드 목록' : '수정하기'}
      </h3>
      <Title intent="md" className={'mt-10 mb-12'}>
        {name}
      </Title>
      <div className="flex gap-10 md:gap-6 mb-20 md:justify-center sm:flex-col">
        <div className="relative aspect-[4/3] flex-1">
          <Image
            src={imgUrl}
            fill
            style={{ objectFit: 'cover' }}
            alt={'카드 이미지'}
          />
        </div>
        <div className="flex-1">
          <CardDetail
            cardDetail={card}
            topIntent={'myCardDetail'}
            bottomIntent={'exchange'}
            dataId={id}
            bgColor={'none'}
            control={control}
            nameForQuantity={'quantity'}
            nameForPrice={'price'}
            givenClassNames={'w-[440px] md:w-full md:max-w-[550px] sm:w-full'}
          />
          <p className="font-thin text-sm text-right md:max-w-[550px]">{`${
            intent === 'sale' ? '출시가' : '현재가'
          } : ${price}p`}</p>
        </div>
      </div>
      <Title intent="sm">교환 희망 정보</Title>
      <div className="flex justify-between mt-12 mb-5 md:gap-8 sm:flex-col sm:gap-4">
        <InputDropdown
          control={control}
          name={'rank'}
          label={'등급'}
          size={'md'}
          options={constants.GRADE_OPTIONS}
          placeholder={'등급을 선택해 주세요'}
          rules={{
            required: '옵션을 선택해 주세요',
          }}
        />
        <InputDropdown
          control={control}
          name={'genre'}
          label={'장르'}
          size={'md'}
          options={constants.GENRE_OPTIONS}
          placeholder={'장르을 선택해 주세요'}
          rules={{
            required: '옵션을 선택해 주세요',
          }}
        />
      </div>
      <InputTextBox
        control={control}
        name={'description'}
        label={'교환 희망 설명'}
        size={'full'}
        placeholder={'설명을 입력해 주세요.'}
        rules={{
          required: '설명을 입력해 주세요',
        }}
      />
      <div className="flex gap-10 mt-14">
        <Button intent="secondary" onClick={() => modal.close()}>
          취소하기
        </Button>
        <Button intent="primary" isPending={isPending}>
          {intent === 'sale' ? '판매하기' : '수정하기'}
        </Button>
      </div>
    </form>
  );
}

export default CardDetailModalForSale;
