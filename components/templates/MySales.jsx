'use client';

import cardsApi from '@/api/cards/cards.api';
import usersApi from '@/api/users/users.api';
import icDropdown from '@/assets/images/ic-dropdown.png';
import constants from '@/constant';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Dropdown from '../atoms/Dropdown';
import InputSearch from '../molecules/InputSearch';
import Title from '../molecules/Title';
import UserCardsSummary from '../molecules/UserCardsSummary';
import CardList from '../organisms/CardList';

function MySales() {
  const [orderBy, setOrderBy] = useState('최신 순');
  const [grade, setGrade] = useState('등급');
  const [genre, setGenre] = useState('장르');
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const { handleSubmit, control } = useForm({ defaultValues: { search: '' } });

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: usersApi.getMe,
  });

  const searchOptions = { orderBy, grade, genre, keyword };
  const { data, isPending } = useQuery({
    queryKey: ['cards', { ...searchOptions }],
    queryFn: () => cardsApi.getMyCardsOfSales(searchOptions),
    staleTime: 0,
    placeholderData: (prevData) => prevData, // 깜박임을 없애기 위해 넣었는데..잘 안 됨(2025.02.19)
    retry: 0,
  });

  const handleSubmitSearch = (dto) => {
    setKeyword(dto.search);
  };

  const cards = data?.cards || [];
  console.log('totalEditions', data?.totalEditions);
  console.log('cards', data?.cards);

  if (isPending) return null;
  return (
    <div>
      <div className="mb-[60px] md:mb-10 sm:mb-5">
        <Title intent="xl" className="sm:hidden">
          나의 판매 포토카드
        </Title>
        <UserCardsSummary
          nickname={user?.nickname}
          userSummary={data?.userSummary}
        />
        <div className="flex justify-between items-center mt-5 sm:hidden">
          <form onSubmit={handleSubmit(handleSubmitSearch)}>
            <InputSearch
              control={control}
              name={'search'}
              placeholder={'검색'}
              size="md"
            />
          </form>
          <div className="flex shrink-0 ml-[60px] md:ml-[30px]">
            <Dropdown
              width="w-[134px]"
              label="등급"
              options={constants.CARD_GRADES}
              onSelect={setGrade}
            />
            <Dropdown
              width="w-[134px]"
              label="장르"
              options={constants.CARD_GENRES}
              onSelect={setGenre}
            />
            <Dropdown
              width="w-[134px]"
              label="판매방법"
              options={constants.HOW_TO_SALE}
              onSelect={setGenre}
            />
          </div>
          <div className="w-full grow-1"></div>
        </div>
        <div className="flex justify-between items-center mt-5 lg:hidden md:hidden">
          <Image
            src={icDropdown}
            alt="드롭다운"
            className="w-[45px] h-[45px]"
          />
          <form onSubmit={handleSubmit(handleSubmitSearch)}>
            <InputSearch
              control={control}
              name={'search'}
              placeholder={'검색'}
              size="md"
            />
          </form>
        </div>
      </div>
      <CardList cards={cards} intent="gallery" />
    </div>
  );
}

export default MySales;
