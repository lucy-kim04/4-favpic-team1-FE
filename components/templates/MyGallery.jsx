'use client';

import cardsApi from '@/api/cards/cards.api';
import usersApi from '@/api/users/users.api';
import icDropdown from '@/assets/images/ic-dropdown.png';
import constants from '@/constant';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Dropdown from '../atoms/Dropdown';
import ConfirmModal from '../molecules/ConfirmModal';
import InputSearch from '../molecules/InputSearch';
import Title from '../molecules/Title';
import UserCardsSummary from '../molecules/UserCardsSummary';
import CardList from '../organisms/CardList';
import FilterModal from '../atoms/Filter';

function MyGallery() {
  const [orderBy, setOrderBy] = useState('최신 순');
  const [grade, setGrade] = useState(null);
  const [genre, setGenre] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const modal = useModal();

  const { handleSubmit, control } = useForm({ defaultValues: { search: '' } });

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: usersApi.getMe,
  });

  // ✅ 필터가 바뀌면 useQuery가 다시 실행되도록 설정
  const searchOptions = { orderBy, grade, genre, keyword };
  const { data, isPending } = useQuery({
    queryKey: ['cards', searchOptions], // <-- searchOptions을 key에 포함시켜 필터 변경 시 다시 호출되도록 함
    queryFn: () => cardsApi.getMyCardsOfGallery(searchOptions),
    staleTime: 0,
    retry: 0,
  });

  const handleSubmitSearch = (dto) => {
    setKeyword(dto.search);
  };

  const handleApplyFilters = (selected) => {
    console.log('✅ 선택된 필터:', selected); // 필터 값 확인

    if (typeof selected === 'string') {
      setGrade(selected); // 선택된 값이 단일 값이라면 바로 grade로 설정
    } else {
      setGrade(selected.등급 || null);
      setGenre(selected.장르 || null);
    }

    console.log('🛠️ 적용 후 state:', {
      grade: selected,
      genre: selected?.장르,
    });
    setIsFilterOpen(false);
  };

  const cards = data?.cards || [];

  if (isPending) return null;

  return (
    <div>
      <div className="mb-[60px] md:mb-10 sm:mb-5">
        <Title
          intent="xl"
          onClick={() => router.push('/my-cards/gallery/create')}
          className="sm:hidden"
        >
          마이갤러리
        </Title>
        <UserCardsSummary
          nickname={user?.nickname}
          userSummary={data?.userSummary}
          intent="inPossesion"
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
          <div className="flex shrink-0 ml-[60px] md:ml-[30px] gap-[45px] md:gap-[25px]">
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
      </div>

      {/* ✅ 필터 모달 */}
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
          }}
          onSelect={handleApplyFilters}
        />
      )}

      <CardList cards={cards} intent="gallery" />
    </div>
  );
}

export default MyGallery;
