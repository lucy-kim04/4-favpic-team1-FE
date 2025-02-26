import shopsApi from '@/api/shops/shops.api';
import { useModal } from '@/contexts/ModalContext';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Card from '../organisms/Card';
import Title from '../molecules/Title';
import InputTextBox from '../molecules/InputTextBox';
import Button from '../atoms/Button';

function CardDetailModalForExchange({ card, onBack }) {
  const { id, imgUrl, name, grade, genre, nickname, reserveCount, price } =
    card;
  const modal = useModal();
  const router = useRouter();

  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      description: '',
    },
  });

  const { mutate: proposeExchange } = useMutation({
    mutationFn: (data) => shopsApi.proposeExchange(data),
    onSuccess: (data) => {
      console.log(getValues(), data);
      modal.close();
      router.push(
        `/result?intent=createShop&&isSuccess=true&&grade=${grade}&&name=${name}&&count=${data.salesCount}`
      );
    },
  });

  const handleExchangeClick = (dto) => {
    console.log(dto);
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
