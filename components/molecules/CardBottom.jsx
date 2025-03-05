import notificationsApi from '@/api/notifications/notifications.api';
import shopsApi from '@/api/shops/shops.api';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Button from '../atoms/Button';
import Logo from '../atoms/Logo';
import ConfirmModal from './ConfirmModal';

function CardBottom({ card, intent, isProposedByMe = false }) {
  const modal = useModal();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    id,
    editionId,
    proposerId,
    shopId,
    nickname,
    price,
    grade,
    name,
    remainingCount,
    salesCount,
    reserveCount,
    content,
  } = card;
  const isExchange = intent === 'exchange';
  const isShop = intent === 'shop';
  const isGallery = intent === 'gallery';
  const quantityLabel = isShop ? '잔여' : '수량';

  const { mutate: cancelProposeExchange } = useMutation({
    mutationFn: () => shopsApi.cancelProposeExchange(id, { editionId }),
    onSuccess: () => {
      // shop의 내가 제시한 교환 목록 갱신
      queryClient.invalidateQueries({
        queryKey: ['my-exchanges', { shopId }],
      });
    },
  });

  const { mutate: refuseProposeExchange } = useMutation({
    mutationFn: () => shopsApi.refuseExchange(id, { editionId }),
    onSuccess: () => {
      // shop의 내가 제안받은 교환 목록 갱신
      queryClient.invalidateQueries({
        queryKey: ['exchanges', { shopId }],
      });
      // 교환 제시한 상대방에게 알림 전송
      sendNotification({
        notificationCase: 'refuseExchange',
        userId: proposerId,
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

  const { mutate: approveExchange } = useMutation({
    mutationFn: () =>
      shopsApi.approveExchange(id, { editionId, proposerId, shopId }),
    onSuccess: () => {
      // shop의 내가 제안받은 교환 목록 갱신 - 승인 시
      queryClient.invalidateQueries({
        queryKey: ['exchanges', { shopId }],
      });
      // shop의 상세 정보 갱신(재고) - 승인 시
      queryClient.invalidateQueries({ queryKey: ['shop'] });
      // queryClient.invalidateQueries({ queryKey: ['shop', { shopId }] });
      // 교환 제시한 상대방에게 알림 전송
      sendNotification({
        notificationCase: 'approveExchange',
        userId: proposerId,
        grade,
        name,
      });
    },
  });

  const handleClickModalLogin = () => {
    router.push('/auth/log-in');
  };

  const handleClickExchangeCancel = () => {
    if (!isLoggedIn)
      return modal.open(
        <ConfirmModal
          title={'로그인이 필요합니다.'}
          content={`로그인이 필요한 서비스입니다.
      로그인 하시겠습니까?`}
          buttonText="로그인하기"
          onClick={handleClickModalLogin}
        />
      );

    return modal.open(
      <ConfirmModal
        title={'교환 제안 취소'}
        content={`교환 제안을 취소하시겠습니까?`}
        buttonText="제안 취소하기"
        onClick={handleClickModalCancelExchange}
      />
    );
  };

  const handleClickModalCancelExchange = () => {
    cancelProposeExchange();
  };

  const handleClickModalRefuseExchange = () => {
    refuseProposeExchange();
  };

  const handleClickExchangeRefuse = () => {
    if (!isLoggedIn)
      return modal.open(
        <ConfirmModal
          title={'로그인이 필요합니다.'}
          content={`로그인이 필요한 서비스입니다.
            로그인 하시겠습니까?`}
          buttonText="로그인하기"
          onClick={handleClickModalLogin}
        />
      );

    return modal.open(
      <ConfirmModal
        title={'교환 제시 거절'}
        content={`[${grade} | ${name}]
         카드와의 교환을 거절하시겠습니까?`}
        buttonText="거절하기"
        onClick={handleClickModalRefuseExchange}
      />
    );
  };

  const handleClickModalApproveExchange = () => {
    approveExchange();
  };

  const handleClickExchangeApprove = () => {
    if (!isLoggedIn)
      return modal.open(
        <ConfirmModal
          title={'로그인이 필요합니다.'}
          content={`로그인이 필요한 서비스입니다.
            로그인 하시겠습니까?`}
          buttonText="로그인하기"
          onClick={handleClickModalLogin}
        />
      );

    return modal.open(
      <ConfirmModal
        title={'교환 제시 승인'}
        content={`[${grade} | ${name}]
         카드와의 교환을 승인하시겠습니까?`}
        buttonText="승인하기"
        onClick={handleClickModalApproveExchange}
      />
    );
  };

  // 교환이 아닐 경우(shop, gallery, sales)
  if (!isExchange)
    return (
      <div>
        <div className="flex justify-between items-center">
          <p className="font-light text-[#a4a4a4] sm:text-[10px]">가격</p>
          <p className="text-lg font-normal sm:text-[10px]">{`${price} P`}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-light text-[#a4a4a4] sm:text-[10px]">
            {quantityLabel}
          </p>
          {isShop ? (
            <div className="flex">
              <p className="font-normal text-lg sm:text-[10px]">{`${remainingCount}`}</p>
              <p className="font-light text-[#a4a4a4] text-lg sm:text-[10px]">
                &nbsp;{`/ ${salesCount}`}
              </p>
            </div>
          ) : (
            <p className="font-normal text-lg sm:text-[10px]">
              {/* {isGallery ? reserveCount : salesCount} */}
              {isGallery ? reserveCount : remainingCount}
            </p>
          )}
        </div>
        <div className="flex justify-center mt-[30px] mb-[10px] sm:hidden">
          <Logo intent="card" />
        </div>
      </div>
    );

  // 교환일 경우
  return (
    <div>
      <p className="font-normal sm:text-[10px] line-clamp-2">{content}</p>
      {isProposedByMe ? (
        <div className="mt-10 md:mt-6">
          <Button
            intent="secondary"
            className="sm:hidden md:hidden"
            onClick={handleClickExchangeCancel}
          >
            취소하기
          </Button>
          <Button
            intent="secondary"
            size="h55"
            className="sm:hidden lg:hidden"
            onClick={handleClickExchangeCancel}
          >
            취소하기
          </Button>
          <Button
            intent="secondary"
            size="h40"
            className="lg:hidden md:hidden"
            onClick={handleClickExchangeCancel}
          >
            취소하기
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex gap-5 mt-10 md:mt-10-6 sm:hidden">
            <Button intent="secondary" onClick={handleClickExchangeRefuse}>
              거절하기
            </Button>
            <Button onClick={handleClickExchangeApprove}>승인하기</Button>
          </div>
          <div className="flex gap-[5px] mt-5 mb-0 lg:hidden md:hidden">
            <Button intent="secondary" size="h40">
              거절
            </Button>
            <Button size="h40">승인</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardBottom;
