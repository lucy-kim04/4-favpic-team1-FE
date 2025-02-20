'use client';

import { useRouter } from 'next/navigation';
import Title from '../molecules/Title';
import CardList from '../organisms/CardList';

function MyGallery({ cards }) {
  const router = useRouter();
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
