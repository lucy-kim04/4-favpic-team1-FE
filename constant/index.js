const CARD_GRADES = ['COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY'];
const CARD_GENRES = ['풍경', '인물', '사물', '여행'];
const CARD_ON_SALE = ['판매 중', '판매 완료'];
const SORT_OPTIONS = ['최신 순', '오래된 순', '높은 가격순', '낮은 가격순'];
const HOW_TO_SALE = ['판매중', '교환 제시 대기 중'];

const GRADE_OPTIONS = [
  { value: 'COMMON', label: 'COMMON' },
  { value: 'RARE', label: 'RARE' },
  { value: 'SUPER RARE', label: 'SUPER RARE' },
  { value: 'LEGENDARY', label: 'LEGENDARY' },
];

const GENRE_OPTIONS = [
  { value: '풍경', label: '풍경' },
  { value: '인물', label: '인물' },
  { value: '사물', label: '사물' },
  { value: '여행', label: '여행' },
];

const constants = {
  CARD_GRADES,
  CARD_GENRES,
  CARD_ON_SALE,
  SORT_OPTIONS,
  HOW_TO_SALE,
  GRADE_OPTIONS,
  GENRE_OPTIONS,
};

export default constants;
