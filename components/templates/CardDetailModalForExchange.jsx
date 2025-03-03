import notificationsApi from '@/api/notifications/notifications.api';
import shopsApi from '@/api/shops/shops.api';
import { useModal } from '@/contexts/ModalContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Button from '../atoms/Button';
import InputTextBox from '../molecules/InputTextBox';
import Title from '../molecules/Title';
import Card from '../organisms/Card';

function CardDetailModalForExchange({ card, onBack, sellerId }) {
  const { id, imgUrl, name, grade, genre, nickname, reserveCount, price } =
    card;
  const modal = useModal();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      description: '',
    },
  });

  const { mutate: proposeExchange } = useMutation({
    mutationFn: ({ id, data }) => shopsApi.proposeExchange(id, data),
    onSuccess: (data) => {
      // console.log(getValues(), data);
      modal.close();
      router.push(
        `/result?intent=proposeExchange&&isSuccess=true&&grade=${grade}&&name=${name}&&count=${data.salesCount}`
      );
      // 상점의 판매자에게 알림 전송
      sendNotification({
        notificationCase: 'arriveProposal',
        userId: sellerId,
        shopId: id,
        grade,
        name,
      });
    },
  });

  const { mutate: sendNotification } = useMutation({
    mutationFn: (dto) => notificationsApi.sendNotification(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
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

  return (
    <form onSubmit={handleSubmit(handleExchangeClick)}>
      <h3 onClick={onBack} className="font-baskin text-[#A4A4A4] text-[24px]">
        {'< '} 포토카드 교환하기
      </h3>
      <Title intent="md" className={'mt-10 mb-12'}>
        {name}
      </Title>
      <div className="flex gap-10 mb-20">
        <div className="w-[440px]">
          <Card card={card} intent={'gallery'} />
        </div>
        <div>
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
            <Button intent="primary">교환하기</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CardDetailModalForExchange;
