import Modal from '../organisms/Modal';
import Title from '../molecules/Title';
import InputSearch from '../molecules/InputSearch';
import { useForm } from 'react-hook-form';
import Dropdown from '../atoms/Dropdown';
import constants from '@/constant';
import cardsApi from '@/api/cards/cards.api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import CardList from '../organisms/CardList';

function SellPhotoCardModal() {
  const [grade, setGrade] = useState('등급');
  const [genre, setGenre] = useState('장르');
  const [keyword, setKeyword] = useState('');

  const { control, handleSubmit } = useForm({ defaultValues: { search: '' } });

  const searchOptions = { grade, genre, keyword };
  const { data, isPending } = useQuery({
    queryKey: ['cards', { ...searchOptions }],
    queryFn: () => cardsApi.getMyCardsOfGallery(searchOptions),
    keepPreviousData: true,
  });

  const handleSubmitSearch = (e) => {
    setKeyword(e.search);
  };

  const cards = data?.cards || [];
  if (isPending) return null;

  return (
    <Modal>
      <h3 className="font-baskin text-[#A4A4A4] text-[24px]">마이갤러리</h3>
      <Title intent="lg" className={'mt-10 mb-5'}>
        나의 포토카드 판매하기
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
      <CardList cards={cards} colNum={2} intent="gallery" />
    </Modal>
  );
}

export default SellPhotoCardModal;
