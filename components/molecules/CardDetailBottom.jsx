'use client';

import shopsApi from '@/api/shops/shops.api';
import exchangeIcon from '@/assets/images/ic-exchange.png';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../atoms/Button';
import Divider from '../atoms/Divider';
import GradeCardBadge from '../atoms/GradeCardBadge';
import NumberStepper from '../atoms/NumberStepper';

function CardDetailBottom({
  cardDetail,
  bottomIntent = 'buyer',
  onPurchase,
  onEditSale,
  onStopSale,
  onStartSale,
  dataId,
}) {
  const [count, setCount] = useState(1);
  const router = useRouter();
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      price: '',
    },
  });

  const {
    exchangeGenre,
    exchangeGrade,
    remainingCount,
    price,
    paidPrice,
    exchangeDesc,
  } = cardDetail;

  const queryClient = useQueryClient();

  const { mutate: purchaseCards } = useMutation({
    mutationFn: (dto) => shopsApi.purchaseCards(dataId, dto),
    onSuccess: () => {
      // TODO: 구매 성공 페이지로 이동
      queryClient.invalidateQueries({ queryKey: ['me'] });
      router.replace('/');
    },
    onError: () => {
      // TODO:구매 실패 페이지로 이동
    },
  });

  const { mutate: deleteShop } = useMutation({
    mutationFn: () => shopsApi.deleteShop(dataId),
    onSuccess: () => {
      // TODO: 삭제 성공 페이지로 이동
      router.push('/');
    },
  });

  const handleClickPurchase = () => {
    if (remainingCount === 0) return;
    // TODO: 확인 모달창 띄우고, 해당 창에서 '구매하기'를 하면 아래 함수 실행
    const data = {
      price,
      purchaseCount: count,
    };
    purchaseCards(data);
  };

  const handleClickExchange = () => {
    if (remainingCount === 0) return;
  };

  const handleClickStopSale = () => {
    // TODO: 확인 모달창 띄우고, 해당 창에서 '판매 내리기'를 하면 아래 함수 실행
    deleteShop();
  };

  // 경우 수는 buyer, seller, exchange, myCardSale
  const renderContent = () => {
    switch (bottomIntent) {
      case 'buyer':
        return (
          <>
            <Divider />
            <div className="py-2 flex justify-between items-center">
              <p className="font-normal text-lg lg:text-xl">구매수량</p>
              <NumberStepper
                value={count}
                onChange={setCount}
                maxCount={remainingCount}
              />
            </div>
            <div className="py-2 flex justify-between items-center">
              <p className="font-normal text-lg lg:text-xl">총 가격</p>
              <p className="font-bold text-xl lg:text-2xl">
                {price * count}P &nbsp;
                <span className="font-light text-[#a5a5a5]">({count}장)</span>
              </p>
            </div>
            <Button
              onClick={handleClickPurchase}
              className="mt-8 lg:mt-16"
              size="h75"
              disabled={remainingCount === 0}
            >
              포토카드 구매하기
            </Button>
            <Button
              onClick={handleClickExchange}
              className="mt-8 lg:mt-[34px]"
              size="h75"
              disabled={remainingCount === 0}
            >
              포토카드 교환하기
            </Button>
          </>
        );

      case 'seller':
        return (
          <>
            <div className="pt-2 mt-[60px] flex gap-[10px] items-center">
              <Image
                className="w-[19px] lg:w-[24px] h-[19px] lg:h-[24px]"
                src={exchangeIcon}
                alt="exchange icon"
                width={24}
                height={24}
              />
              <p className="font-bold text-[22px] lg:text-[28px]">
                교환 희망 정보
              </p>
            </div>
            <Divider intent="thick" />
            <div>
              <div className="flex items-center gap-[15px]">
                <GradeCardBadge variant="detail">
                  {exchangeGrade}
                </GradeCardBadge>
                <span>|</span>
                <p className="font-bold text-lg lg:text-2xl text-[#4a4a4a]">
                  {exchangeGenre}
                </p>
              </div>
              <Divider />
              <p className="font-normal text-base lg:text-lg">{exchangeDesc}</p>
              <div className="flex flex-col gap-4 mt-20">
                <Button onClick={onEditSale} size="h75">
                  수정하기
                </Button>
                <Button
                  onClick={handleClickStopSale}
                  size="h75"
                  intent="secondary"
                >
                  판매 내리기
                </Button>
              </div>
            </div>
          </>
        );

      case 'exchange':
        return (
          <div className="pt-4">
            <div className="py-2 flex justify-between items-center">
              <p className="font-normal text-lg lg:text-xl">총 판매 수량</p>
              <div className="flex justify-center gap-4 items-center">
                <NumberStepper
                  value={count}
                  onChange={setCount}
                  maxCount={remainingCount}
                />
                <div>
                  <p className="font-bold text-lg lg:text-xl">/3</p>
                  <p className="font-light text-xs lg:text-sm text-[#dddddd]">
                    최대 {remainingCount}장
                  </p>
                </div>
              </div>
            </div>
            <div className="py-2 flex justify-between items-center">
              <p className="font-normal text-lg lg:text-xl">장당 가격</p>
              <div className="relative">
                <input
                  {...register('price', {
                    required: '가격을 입력해주세요',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: '숫자만 입력 가능합니다',
                    },
                  })}
                  className="w-[202px] lg:w-[245px] h-[45px] lg:h-[50px] border rounded-sm bg-black placeholder-gray-200 placeholder:font-thin text-white px-5 py-[18px]"
                  placeholder="숫자만 입력"
                />
                {errors.price && (
                  <p className="absolute top-full left-0 text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  P
                </span>
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <Button onClick={onStartSale} className="mt-8 lg:mt-16" size="h75">
            포토카드 판매하기
          </Button>
        );

      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
}

export default CardDetailBottom;
