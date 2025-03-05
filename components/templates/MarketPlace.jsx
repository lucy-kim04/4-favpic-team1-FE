'use client';

import shopsApi from '@/api/shops/shops.api';
import icDropdown from '@/assets/images/ic-dropdown.png';
import constants from '@/constant';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Dropdown from '../atoms/Dropdown';
import FilterModal from '../atoms/Filter';
import ConfirmModal from '../molecules/ConfirmModal';
import InputSearch from '../molecules/InputSearch';
import Title from '../molecules/Title';
import CardList from '../organisms/CardList';
import CardActionModal from './CardActionModal';

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchOptions = { orderBy, grade, genre, onSale, keyword };

  const targetRef = useRef(null);

  const limit = 9; // 서버 컴포넌트(MarketPlacePage)에서 initialData로 넘겨주는 개수와 같아야 함

  const { data, isPending, fetchNextPage } = useInfiniteQuery({
    queryKey: ['shops', { ...searchOptions }],
    queryFn: ({ pageParam }) => {
      return shopsApi.getShops({
        ...searchOptions,
        limit,
        skip: pageParam * limit,
      });
    },
    initialPageParam: 0,
    staleTime: 0,
    initialData: { pages: [initialData], pageParams: [] },
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length;
    },
  });

  const handleClickMore = () => {
    fetchNextPage();
  };

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
          buttonText='로그인하기'
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
    if (!isLoggedIn)
      return modal.open(
        <ConfirmModal
          title={'로그인이 필요합니다.'}
          content={`로그인이 필요한 서비스입니다.
            로그인 하시겠습니까?`}
          buttonText='로그인하기'
          onClick={handleClickModalButton}
        />
      );
    modal.open(<CardActionModal intent='sale' />);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      console.log(entry);
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });
    console.log(targetRef.current);
    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [data]);

  if (isPending) return null;
  const shops = data?.pages.flatMap((page) => page) || [];

  return (
    <div>
      {/* <MarketPlaceHeader /> */}
      <div className='mb-[60px] md:mb-10 sm:mb-5'>
        <Title
          intent='xl'
          onClick={handleTitleButtonClick}
          className='sm:hidden'
        >
          마켓플레이스
        </Title>
        <div className='flex justify-between items-center mt-5 sm:hidden'>
          <form onSubmit={handleSubmit(handleSubmitSearch)} className='w-full'>
            <InputSearch
              control={control}
              name={'search'}
              placeholder={'검색'}
              size='md'
            />
          </form>

          <div className="flex shrink-0 sm:hidden ml-[60px] md:ml-[30px] gap-[45px] md:gap-[25px] z-10">
            <Dropdown
              label='등급'
              options={constants.CARD_GRADES}
              onSelect={setGrade}
            />
            <Dropdown
              label='장르'
              options={constants.CARD_GENRES}
              onSelect={setGenre}
            />
            <Dropdown
              label='매진 여부'
              options={constants.CARD_ON_SALE}
              onSelect={setOnSale}
            />
          </div>
          <div className='w-full grow-1'></div>
          <button
            className='lg:hidden md:hidden w-10 h-10 flex items-center justify-center border border-white rounded'
            onClick={() => setIsFilterOpen(true)}
          ></button>

          <div className="shrink-0 z-10">
            <Dropdown
              label={orderBy}
              options={constants.SORT_OPTIONS}
              isBox={true}
              onSelect={setOrderBy}
            />
          </div>
        </div>
        <div className='flex flex-col items-center mt-5 lg:hidden md:hidden w-full'>
          <form
            onSubmit={handleSubmit(handleSubmitSearch)}
            className="w-[345px] sm:w-full"
          >
            <InputSearch
              control={control}
              name={'search'}
              placeholder={'검색'}
              size='md'
            />
          </form>
          <div className='w-full border-t border-[#5A5a5a] mt-3'></div>
          <div className='flex justify-between items-center w-full mt-4 cursor-pointer'>
            <img
              src={icDropdown.src}
              alt='드롭다운'
              className='w-[45px] h-[45px] cursor-pointer'
              onClick={() => setIsFilterOpen(true)}
            />
            <Dropdown
              label={orderBy}
              options={constants.SORT_OPTIONS}
              isBox={true}
              onSelect={setOrderBy}
            />
          </div>
        </div>
      </div>
      <CardList
        cards={shops}
        intent="shop"
        onCardClick={handleClickCard}
        ref={targetRef}
      />
      <div ref={targetRef}></div>
      <div>
        {isFilterOpen && (
          <FilterModal
            onClose={() => setIsFilterOpen(false)}
            filters={{
              등급: constants.CARD_GRADES.map((grade) => ({
                label: grade,
                count: shops.filter((shop) => shop.grade === grade).length,
              })),
              장르: constants.CARD_GENRES.map((genre) => ({
                label: genre,
                count: shops.filter((shop) => shop.genre === genre).length,
              })),
              '매진 여부': constants.CARD_ON_SALE.map((sale) => ({
                label: sale,
                count: shops.filter((shop) => shop.onSale === sale).length,
              })),
            }}
            onSelect={(selected) => {
              setSelectedFilter(selected);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default MarketPlace;
