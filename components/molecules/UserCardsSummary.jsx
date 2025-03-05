'use client';

import usersApi from '@/api/users/users.api';
import { useQuery } from '@tanstack/react-query';
import GradeMyCardCount from '../atoms/GradeMyCardCount';

function UserCardsSummary({ nickname, intent = 'notPossesion' }) {
  const label =
    intent === 'inPossesion' ? '보유한 포토카드' : '판매중인 포토카드';

  const isMyGallery = intent === 'inPossesion';
  const isSales = intent === 'notPossesion';

  console.log(isMyGallery, isSales);

  const { data: galleryData } = useQuery({
    queryKey: ['myGallerySummary'],
    queryFn: usersApi.getMyGallerySummary,
    enabled: isMyGallery,
    staleTime: 0,
  });

  const { data: salesData } = useQuery({
    queryKey: ['mySalesSummary'],
    queryFn: usersApi.getMySalesSummary,
    enabled: isSales,
    staleTime: 0,
  });

  const totalCount = isMyGallery
    ? galleryData?.totalCount || 0
    : salesData?.totalCount || 0;
  const userSummary = isMyGallery
    ? galleryData?.userSummary || {}
    : salesData?.userSummary || {};

  if (!galleryData && !salesData) return null;
  return (
    <div className="mt-10 sm:mt-5">
      <div className="flex items-center">
        <p className="text-2xl font-bold mr-[10px]">
          {nickname}님이 {label}
        </p>
        <p className="text-xl text-[#a4a4a4]">({totalCount}장)</p>
      </div>
      <div className="flex gap-5 mt-5  mb-10 sm:mt-[15px] sm:mb-[15px]">
        <GradeMyCardCount gradeCard={'COMMON'} count={userSummary['COMMON']} />
        <GradeMyCardCount gradeCard={'RARE'} count={userSummary['RARE']} />
        <GradeMyCardCount
          gradeCard={'SUPER RARE'}
          count={userSummary['SUPER RARE']}
        />
        <GradeMyCardCount
          gradeCard={'LEGENDARY'}
          count={userSummary['LEGENDARY']}
        />
      </div>
      <div className="h-[1px] bg-[#5a5a5a] "></div>
    </div>
  );
}

export default UserCardsSummary;
