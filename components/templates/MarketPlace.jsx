'use client';

import shopsApi from '@/api/shops/shops.api';
import constants from '@/constant';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Dropdown from '../atoms/Dropdown';
import ConfirmModal from '../molecules/ConfirmModal';
import InputSearch from '../molecules/InputSearch';
import Title from '../molecules/Title';
import CardList from '../organisms/CardList';
import SellPhotoCardModal from './SellPhotoCardModal';

function MarketPlace({ initialData }) {
  const [orderBy, setOrderBy] = useState('최신 순');
  const [grade, setGrade] = useState('등급');
  const [genre, setGenre] = useState('장르');
  const [onSale, setOnSale] = useState('매진 여부');
  const [keyword, setKeyword] = useState('');
  const modal = useModal();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const { handleSubmit, control } = useForm({ defaultValues: { search: '' } });

  const searchOptions = { orderBy, grade, genre, onSale, keyword };
  const { data: shops, isPending } = useQuery({
    queryKey: ['shops', { ...searchOptions }],
    queryFn: () => shopsApi.getShops(searchOptions),
    initialData,
    staleTime: 0,
    placeholderData: (prevData) => prevData, // 깜박임을 없애기 위해 넣었는데..잘 안 됨(2025.02.19)
    retry: 0,
  });

  const handleSubmitSearch = (dto) => {
    setKeyword(dto.search);
  };

  const handleClickModalButton = () => {
    router.push('/auth/log-in');
  };

  const handleClickCard = (card, intent) => {
    if (!isLoggedIn)
      return modal.open(
        <ConfirmModal
          title={'로그인이 필요합니다.'}
          content={`로그인이 필요한 서비스입니다.
            로그인 하시겠습니까?`}
          buttonText="로그인하기"
          onClick={handleClickModalButton}
        />
      );

    const cardLink =
      intent === 'shop'
        ? `/${card.id}`
        : intent === 'gallery'
        ? `/my-cards/gallery/${card.id}`
        : `/my-cards/sales/${card.id}`;

    router.push(`${cardLink}`);
  };

  const handleTitleButtonClick = () => {
    modal.open(<SellPhotoCardModal />);
  };

  if (isPending) return null;

  return (
    <div>
      {/* <MarketPlaceHeader /> */}
      <div className="mb-[60px] md:mb-10 sm:mb-5">
        <Title
          intent="xl"
          onClick={handleTitleButtonClick}
          className="sm:hidden"
        >
          마켓플레이스
        </Title>
        <div className="flex justify-between items-center mt-5">
          <form onSubmit={handleSubmit(handleSubmitSearch)}>
            <InputSearch
              control={control}
              name={'search'}
              placeholder={'검색'}
              size="md"
            />
          </form>
          <div className="flex shrink-0 ml-[60px] md:ml-[30px] gap-[45px] md:gap-[25px]">
            <Dropdown
              label="등급"
              options={constants.CARD_GRADES}
              onSelect={setGrade}
            />
            <Dropdown
              label="장르"
              options={constants.CARD_GENRES}
              onSelect={setGenre}
            />
            <Dropdown
              label="매진 여부"
              options={constants.CARD_ON_SALE}
              onSelect={setOnSale}
            />
          </div>
          <div className="w-full grow-1"></div>
          <div className="shrink-0">
            <Dropdown
              label={orderBy}
              options={constants.SORT_OPTIONS}
              isBox={true}
              onSelect={setOrderBy}
            />
          </div>
        </div>
      </div>
      <CardList cards={shops} intent="shop" onCardClick={handleClickCard} />
    </div>
  );
}

export default MarketPlace;
