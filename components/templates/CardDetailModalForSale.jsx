import Image from 'next/image';
import CardDetail from '../organisms/CardDetail';
import InputDropdown from '../molecules/InputDropdown';
import { useForm } from 'react-hook-form';
import constants from '@/constant/index';
import InputTextBox from '../molecules/InputTextBox';
import Button from '../atoms/Button';
import { useModal } from '@/contexts/ModalContext';
import { useRouter } from 'next/navigation';
import shopsApi from '@/api/shops/shops.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Title from '../molecules/Title';
import { useEffect } from 'react';

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

  const { mutate: createShop } = useMutation({
    mutationFn: (data) => shopsApi.createShop(data),
    onSuccess: (data) => {
      modal.close();
      queryClient.invalidateQueries(['shop']);
      router.push(
        `/result?intent=createShop&&isSuccess=true&&grade=${grade}&&name=${name}&&count=${data.salesCount}`
      );
    },
  });

  const { mutate: updateShop } = useMutation({
    mutationFn: (data) => shopsApi.updateShop(shopId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['shop']);
      modal.close();
      router.push(
        `/result?intent=updateShop&&isSuccess=true&&grade=${grade}&&name=${name}&&count=${data.salesCount}`
      );
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 onClick={onBack} className="font-baskin text-[#A4A4A4] text-[24px]">
        {intent === 'sale' ? '< 나의 포토카드 판매하기' : '수정하기'}
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
          <p className="font-thin text-sm text-right">{`${
            intent === 'sale' ? '출시가' : '현재가'
          } : ${price}p`}</p>
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
        <Button intent="primary">
          {intent === 'sale' ? '판매하기' : '수정하기'}
        </Button>
      </div>
    </form>
  );
}

export default CardDetailModalForSale;
