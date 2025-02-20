import clsx from 'clsx';

/**
 * card detail 에서 사용
 * thin : 1px 회색 라인
 * thick : 2px 흰색 라인
 */

const dividerIntent = {
  thin: 'h-[1px] bg-[#5a5a5a]',
  thick: 'h-[2px] bg-white',
};

const Divider = ({ intent = 'thin' }) => {
  return <div className={clsx('my-5 sm:my-[10px]', dividerIntent[intent])} />;
};

export default Divider;
