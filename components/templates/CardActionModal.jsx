'use client';

import Modal from '../organisms/Modal';
import Title from '../molecules/Title';
import InputSearch from '../molecules/InputSearch';
import { useForm } from 'react-hook-form';
import Dropdown from '../atoms/Dropdown';
import constants from '@/constant';
import cardsApi from '@/api/cards/cards.api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import CardList from '../organisms/CardList';
import CardDetailModalForSale from './CardDetailModalForSale';
import CardDetailModalForExchange from './CardDetailModalForExchange';

/**
 *  - intent : sale, exchange
 */
function CardActionModal({ intent }) {
  const [modalContent, setModalContent] = useState('list');
  const [selectedCard, setSelectedCard] = useState(null);
  const [grade, setGrade] = useState('등급');
  const [genre, setGenre] = useState('장르');
  const [keyword, setKeyword] = useState('');
  const containerRef = useRef(null);
  const { control, handleSubmit } = useForm({ defaultValues: { search: '' } });

  let title, subTitle;
  switch (intent) {
    case 'sale':
      title = '나의 포토카드 판매하기';
      subTitle = '마이갤러리';
      break;
    case 'exchange':
      title = '포토카드 교환하기';
      subTitle = '마이갤러리';
      break;
  }

  const searchOptions = { grade, genre, keyword };
  const { data, isPending } = useQuery({
    queryKey: ['cards', { ...searchOptions }],
    queryFn: () => cardsApi.getMyCardsOfGallery(searchOptions),
    keepPreviousData: true, // 초기 깜빡임 해결을 위해 넣었으나, 잘안됨
  });

  useEffect(() => {
    // 모달내 화면(콘텐츠)가 변경될 때마다 스크롤을 맨 위로 설정
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [modalContent]);

  const handleSubmitSearch = (e) => {
    setKeyword(e.search);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setModalContent('detail');
  };

  const handleBack = () => {
    setModalContent('list');
    setSelectedCard(null);
  };

  const cards = data?.cards || [];
  if (isPending) return null;

  return (
    <Modal ref={containerRef}>
      {modalContent === 'list' ? (
        <>
          <h3 className="font-baskin text-[#A4A4A4] text-[24px]">{subTitle}</h3>
          <Title intent="lg" className={'mt-10 mb-5'}>
            {title}
          </Title>
          <div className="flex items-center gap-16 mb-10">
            <form onSubmit={handleSubmit(handleSubmitSearch)}>
              <InputSearch
                control={control}
                name={'search'}
                placeholder={'검색'}
                size={'md'}
              />
            </form>
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
          </div>
          <CardList
            cards={cards}
            colNum={2}
            intent="gallery"
            onCardClick={handleCardClick}
          />
        </>
      ) : intent === 'sale' ? (
        // 카드 판매하기 디테일
        <CardDetailModalForSale card={selectedCard} onBack={handleBack} />
      ) : (
        // 카드 교환하기 디테일
        <CardDetailModalForExchange card={selectedCard} onBack={handleBack} />
      )}
    </Modal>
  );
}

export default CardActionModal;
