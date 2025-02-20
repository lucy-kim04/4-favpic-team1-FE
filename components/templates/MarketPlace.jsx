'use client';

import shopsApi from '@/api/shops/shops.api';
import constants from '@/constant';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Dropdown from '../atoms/Dropdown';
import InputSearch from '../molecules/InputSearch';
import Title from '../molecules/Title';
import CardList from '../organisms/CardList';

function MarketPlace({ initialData }) {
  const [orderBy, setOrderBy] = useState('최신 순');
  const [grade, setGrade] = useState('등급');
  const [genre, setGenre] = useState('장르');
  const [onSale, setOnSale] = useState('매진 여부');
  const [keyword, setKeyword] = useState('');

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

  console.log(shops);

  if (isPending) return null;

  return (
    <div>
      {/* <MarketPlaceHeader /> */}
      <div className="mb-[60px] md:mb-10 sm:mb-5">
        <Title
          intent="xl"
          onClick={() => {
            alert('구현중');
          }}
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
          <div className="flex gap-11 shrink-0 ml-[60px]">
            <Dropdown
              label={grade}
              options={constants.CARD_GRADES}
              onSelect={setGrade}
            />
            <Dropdown
              label={genre}
              options={constants.CARD_GENRES}
              onSelect={setGenre}
            />
            <Dropdown
              label={onSale}
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
      <CardList cards={shops} intent="shop" />
    </div>
  );
}

export default MarketPlace;
