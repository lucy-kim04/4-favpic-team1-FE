import notificationsApi from '@/api/notifications/notifications.api';
import shopsApi from '@/api/shops/shops.api';
import { useModal } from '@/contexts/ModalContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Button from '../atoms/Button';
import Loader from '../atoms/Loader';
import InputTextBox from '../molecules/InputTextBox';
import Title from '../molecules/Title';
import Card from '../organisms/Card';
import Image from 'next/image';
import imgLess from '@/assets/images/ic-less.png';
import { useEffect, useState } from 'react';

function CardDetailModalForExchange({ card, onBack, sellerId, shopId }) {
  const { id, imgUrl, name, grade, genre, nickname, reserveCount, price } =
    card;
  const modal = useModal();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      description: '',
    },
  });

  console.log(card);

  const { mutate: proposeExchange, isPending: isExchangePending } = useMutation(
    {
      mutationFn: ({ id, data }) => shopsApi.proposeExchange(id, data),
      onSuccess: (data) => {
        setIsTransitioning(true);
        // 상점의 판매자에게 알림 전송
        sendNotification({
          notificationCase: 'arriveProposal',
          userId: sellerId,
          shopId,
          grade,
          name,
        });
        router.push(
          `/result?intent=proposeExchange&&isSuccess=true&&grade=${grade}&&name=${name}&&count=${data.salesCount}`
        );
      },
    }
  );

  const { mutate: sendNotification } = useMutation({
    mutationFn: (dto) => notificationsApi.sendNotification(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['exchanges'] });
      queryClient.invalidateQueries({ queryKey: ['my-exchanges'] });
    },
  });

  const handleExchangeClick = (dto) => {
    const shopId = pathname.replace(/^\/+/, '');

    const data = {
      content: dto.description,
      cardId: id,
    };

    proposeExchange({ id: shopId, data });
  };

  useEffect(() => {
    if (isTransitioning && pathname === '/result') {
      modal.close();
      setIsTransitioning(false);
    }
  }, [isTransitioning, pathname]);

  if (isTransitioning) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EFFF04]"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleExchangeClick)}>
      <h3
        onClick={onBack}
        className="font-baskin text-[#A4A4A4] text-[24px] sm:text-white sm:text-center sm:text-xl"
      >
        <Image
          src={imgLess}
          width={12}
          height={22}
          alt={'less'}
          className="sm:hidden inline-block py-1 mr-3 cursor-pointer"
        />
        포토카드 교환하기
      </h3>
      <Title intent="md" className={'mt-10 mb-12'}>
        {name}
      </Title>
      <div className="flex gap-10 mb-20 md:justify-center sm:flex-col sm:justify-center sm:items-center">
        <div className="w-[440px] sm:w-[345px]">
          <Card card={card} intent={'gallery'} />
        </div>
        <div className="md:w-[400px] sm:w-[345px]">
          <InputTextBox
            control={control}
            name={'description'}
            size={'md'}
            label={'교환 제시 내용'}
            placeholder={'내용을 입력해 주세요'}
            rules={{ required: '설명을 입력해 주세요' }}
          />
          <div className="flex mt-5 gap-5">
            <Button intent="secondary" onClick={() => modal.close()}>
              취소하기
            </Button>
            <Button intent="primary">
              {isExchangePending ? <Loader /> : '교환하기'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CardDetailModalForExchange;
