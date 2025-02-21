'use client';

import cardsApi from '@/api/cards/cards.api';
import constants from '@/constant';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Dropdown from '../atoms/Dropdown';
import InputSearch from '../molecules/InputSearch';
import Title from '../molecules/Title';
import CardList from '../organisms/CardList';

function MyGallery({ initialData }) {
  const [orderBy, setOrderBy] = useState('최신 순');
  const [grade, setGrade] = useState('등급');
  const [genre, setGenre] = useState('장르');
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const { handleSubmit, control } = useForm({ defaultValues: { search: '' } });

  const searchOptions = { orderBy, grade, genre, keyword };
  const { data, isPending } = useQuery({
    queryKey: ['cards', { ...searchOptions }],
    queryFn: () => cardsApi.getMyCardsOfGallery(searchOptions),
    initialData,
    staleTime: 0,
    placeholderData: (prevData) => prevData, // 깜박임을 없애기 위해 넣었는데..잘 안 됨(2025.02.19)
    retry: 0,
  });

  const handleSubmitSearch = (dto) => {
    setKeyword(dto.search);
  };

  const cards = data || [];

  console.log(cards);
  if (isPending) return null;

  return (
    <div>
      <div className="mb-[60px] md:mb-10 sm:mb-5">
        <Title
          intent="xl"
          onClick={() => {
            router.push('/my-cards/gallery/create');
          }}
          className="sm:hidden"
        >
          마이갤러리
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
          <div className="flex shrink-0 ml-[60px]">
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
          </div>
          <div className="w-full grow-1"></div>
          <div className="shrink-0">
            <Dropdown
              width="w-[180px]"
              label={orderBy}
              options={constants.SORT_OPTIONS}
              isBox={true}
              onSelect={setOrderBy}
            />
          </div>
        </div>
      </div>
      <CardList cards={cards} intent="gallery" />
    </div>
  );
}

export default MyGallery;
