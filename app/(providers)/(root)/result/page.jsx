'use client';

import ResultCreateCard from '@/components/molecules/ResultCreateCard';
import ResultCreateShop from '@/components/molecules/ResultCreateShop';
import ResultProposeExchange from '@/components/molecules/ResultProposeExchange';
import ResultPurchase from '@/components/molecules/ResultPurchase';
import ResultUpdateShop from '@/components/molecules/ResultUpdateShop';
import { useSearchParams } from 'next/navigation';

/**
 * 성공/실패 결과 페이지 사용 방법
 * - router로 이동 시에 query로 필요한 값을 전달
 * - intent: purchase(카드 구매), createCard(카드 생성), createShop(상점 생성/판매 등록), updateShop(상점 수정), proposeExchange(교환 제시)
 * - 그 외에 isSuccess, name, grade, count를 예시와 같이 전달합니다.
 * - 예시 코드
 *    router.push(
        `/result?intent=purchase&&isSuccess=true&&grade=${grade}&&name=${name}&&count=${count}`
      );
 */
function ResultPage() {
  const searchParams = useSearchParams();
  const intent = searchParams.get('intent');
  const isSuccess = searchParams.get('isSuccess') === 'true';
  const name = searchParams.get('name');
  const grade = searchParams.get('grade');
  const count = Number(searchParams.get('count'));

  switch (intent) {
    case 'purchase':
      return (
        <ResultPurchase
          isSuccess={isSuccess}
          name={name}
          grade={grade}
          count={count}
        />
      );
    case 'createCard':
      return (
        <ResultCreateCard isSuccess={isSuccess} name={name} grade={grade} />
      );
    case 'createShop':
      return (
        <ResultCreateShop
          isSuccess={isSuccess}
          name={name}
          grade={grade}
          count={count}
        />
      );
    case 'updateShop':
      return (
        <ResultUpdateShop
          isSuccess={isSuccess}
          name={name}
          grade={grade}
          count={count}
        />
      );
    case 'proposeExchange':
      return <ResultProposeExchange isSuccess={isSuccess} />;
  }
}

export default ResultPage;
