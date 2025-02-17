import logo from '@/assets/images/logo.png';
import clsx from 'clsx';
import Image from 'next/image';

/**
 * intent 옵션(auth, card)
 * - 미설정 시 'GNB' 용
 * - auth: 로그인/회원가입 페이지 용
 * - card: 카드 하단용
 */
function Logo({ intent }) {
  const defaultClassName = clsx('w-[140px] md:w-[111px] sm:w-[84px]');
  const intentClassName = clsx({
    '!w-[330px] sm:!w-[189px]': intent === 'auth',
    '!w-[100px]': intent === 'card ',
  });
  return (
    <div>
      <Image
        src={logo}
        alt="로고"
        className={clsx(defaultClassName, intentClassName)}
      />
    </div>
  );
}

export default Logo;
