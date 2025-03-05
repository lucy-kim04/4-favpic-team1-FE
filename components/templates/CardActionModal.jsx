'use client';

import cardsApi from '@/api/cards/cards.api';
import constants from '@/constant';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Dropdown from '../atoms/Dropdown';
import InputSearch from '../molecules/InputSearch';
import Pagination from '../molecules/Pagination';
import Title from '../molecules/Title';
import CardList from '../organisms/CardList';
import Modal from '../organisms/Modal';
import CardDetailModalForExchange from './CardDetailModalForExchange';
import CardDetailModalForSale from './CardDetailModalForSale';
import imgFilter from '@/assets/images/ic-filter.png';
import Image from 'next/image';
import TitleText from '../atoms/TitleText';
import Divider from '../atoms/Divider';

/**
 *  - intent : sale, exchange
 */
function CardActionModal({ intent, sellerId, shopId }) {
  const [modalContent, setModalContent] = useState('list');
  const [selectedCard, setSelectedCard] = useState(null);
  const [grade, setGrade] = useState('등급');
  const [genre, setGenre] = useState('장르');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1); // pagination에 필요
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

  const limit = 3; // 페이지당 표시 개수

  const searchOptions = {
    grade,
    genre,
    keyword,
    limit,
    skip: (page - 1) * limit,
  };
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
    if (e.search) {
      setPage(1);
    }
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
  const searchCount = data?.searchCount || 0;
  const maxPage = Math.ceil(searchCount / searchOptions.limit);
  if (isPending) return null;

  return (
    <Modal ref={containerRef}>
      {modalContent === 'list' ? (
        <>
          <h3 className="font-baskin text-[#A4A4A4] text-[24px] sm:text-white sm:text-center sm:text-xl">
            {subTitle}
          </h3>
          <div className="mt-10 sm:mt-4 mb-[30px]">
            <TitleText intent={'lg'}>{title}</TitleText>
            <div className="sm:hidden h-[2px] bg-white my-5 sm:my-[10px]" />
          </div>
          <div className="flex items-center gap-8 mb-10 sm:mb-5 sm:gap-3 sm:justify-between">
            <div className="hidden sm:flex items-center justify-center border w-[55px] h-[55px] px-3 py-1">
              <Image
                src={imgFilter}
                width={20}
                height={20}
                alt="dropdown button"
              />
            </div>
            <form
              onSubmit={handleSubmit(handleSubmitSearch)}
              className="sm:flex-1"
            >
              <InputSearch
                control={control}
                name={'search'}
                placeholder={'검색'}
                size={'md'}
              />
            </form>
            <div className="flex gap-10 sm:hidden">
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
          </div>
          <CardList
            cards={cards}
            colNum={2}
            intent="gallery"
            onCardClick={handleCardClick}
          />
          <Pagination currentPage={page} maxPage={maxPage} onClick={setPage} />
        </>
      ) : intent === 'sale' ? (
        // 카드 판매하기 디테일
        <CardDetailModalForSale card={selectedCard} onBack={handleBack} />
      ) : (
        // 카드 교환하기 디테일
        <CardDetailModalForExchange
          card={selectedCard}
          onBack={handleBack}
          sellerId={sellerId}
          shopId={shopId}
        />
      )}
    </Modal>
  );
}

export default CardActionModal;
