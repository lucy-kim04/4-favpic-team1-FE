import cardImage1 from '@/assets/images/card-image1.png';
import Card from '@/components/organism/Card';

const card = {
  seller: '미쓰손',
  name: '우리집 앞마당 우리집 앞마당 우리집 앞마당',
  price: 4,
  grade: 'COMMON',
  genre: '풍경',
  imgUrl: cardImage1,
  description:
    '우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다.',
};

function MyCardsGalleryPage() {
  return (
    <div>
      <Card card={card} />
    </div>
  );
}

export default MyCardsGalleryPage;
