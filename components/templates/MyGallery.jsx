'use client';

import cardsApi from '@/api/cards/cards.api';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Title from '../molecules/Title';
import CardList from '../organisms/CardList';

function MyGallery({ initialData }) {
  const [orderBy, setOrderBy] = useState('최신 순');
  const [grade, setGrade] = useState('등급');
  const [genre, setGenre] = useState('장르');
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const searchOptions = { orderBy, grade, genre, keyword };
  const { data, isPending } = useQuery({
    queryKey: ['cards', { ...searchOptions }],
    queryFn: () => cardsApi.getMyCardsOfGallery(searchOptions),
    initialData,
    staleTime: 0,
    placeholderData: (prevData) => prevData, // 깜박임을 없애기 위해 넣었는데..잘 안 됨(2025.02.19)
    retry: 0,
  });

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
      </div>
      <CardList cards={cards} intent="gallery" />
    </div>
  );
}

export default MyGallery;
