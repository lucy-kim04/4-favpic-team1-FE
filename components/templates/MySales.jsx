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
import FilterModal from '../atoms/Filter';

function MySales() {
  const [grade, setGrade] = useState('등급');
  const [genre, setGenre] = useState('장르');
  const [onSale, setOnSale] = useState('매진 여부');
  const [howToSale, setHowToSale] = useState('판매 방법');
  const [keyword, setKeyword] = useState('');
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { handleSubmit, control } = useForm({ defaultValues: { search: '' } });

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: usersApi.getMe,
  });

  const searchOptions = { grade, genre, onSale, howToSale, keyword };
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
          <div className="flex shrink-0 ml-[60px] md:ml-[30px] gap-[45px] md:gap-[25px] sm:hidden">
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
              label="판매 방법"
              options={constants.HOW_TO_SALE}
              onSelect={setHowToSale}
            />
            <Dropdown
              width="w-[140px]"
              label="매진 여부"
              options={constants.CARD_ON_SALE}
              onSelect={setOnSale}
            />
          </div>
          <div className="w-full grow-1"></div>
        </div>
        <div className="flex justify-between items-center mt-5 lg:hidden md:hidden">
          <Image
            src={icDropdown}
            alt="드롭다운"
            className="w-[45px] h-[45px] cursor-pointer"
            onClick={() => setIsFilterOpen(true)}
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
        {isFilterOpen && (
          <FilterModal
            onClose={() => setIsFilterOpen(false)}
            filters={{
              등급: constants.CARD_GRADES.map((grade) => ({
                label: grade,
                count: cards.filter((card) => card.grade === grade).length,
              })),
              장르: constants.CARD_GENRES.map((genre) => ({
                label: genre,
                count: cards.filter((card) => card.genre === genre).length,
              })),
              '매진 여부': constants.CARD_ON_SALE.map((sale) => ({
                label: sale,
                count: cards.filter((card) => card.onSale === sale).length,
              })),
            }}
            onSelect={(selected) => console.log('선택된 필터:', selected)}
          />
        )}
      </div>
      <CardList cards={cards} intent="sales" />
    </div>
  );
}

export default MySales;
