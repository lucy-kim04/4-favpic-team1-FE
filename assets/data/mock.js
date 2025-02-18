import cardImage1 from '@/assets/images/card-image1.png';
import cardImage2 from '@/assets/images/card-image2.png';
import cardImage3 from '@/assets/images/card-image3.png';

const card1 = {
  seller: '미쓰손',
  name: '우리집 앞마당 우리집 앞마당 우리집 앞마당',
  price: 4,
  exchangePrice: 3,
  salesEditionCount: 2,
  totalEditionCount: 5,
  grade: 'COMMON',
  genre: '풍경',
  imgUrl: cardImage1,
  description:
    '우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다.',
  proposalContent:
    '스페인 여행 사진도 좋은데..우리집 앞마당 포토카드와 교환하고 싶습니다!',
};
const card2 = {
  seller: '랍스타',
  name: 'How Far I"ll Go',
  price: 7,
  exchangePrice: 4,
  salesEditionCount: 1,
  totalEditionCount: 3,
  grade: 'RARE',
  genre: '풍경',
  imgUrl: cardImage2,
  description: '하와이 스타일 카드입니다. 야자수가 멋드러집니다.',
  proposalContent:
    '푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.',
};
const card3 = {
  seller: '프로여행러',
  name: '스페인 여행',
  price: 10,
  exchangePrice: 0,
  salesEditionCount: 1,
  totalEditionCount: 1,
  grade: 'SUPER RARE',
  genre: '여행',
  imgUrl: cardImage3,
  description:
    '단 1개밖에 발행되지 않은 희귀한 카드입니다. 스페인 국왕의 사돈의 팔촌이 발행한 카드입니다.',
  proposalContent: '제 카드로 가능할까요?',
};

const cards = [card1, card2, card3];

const mockData = {
  card1,
  card2,
  card3,
  cards,
};

export default mockData;
