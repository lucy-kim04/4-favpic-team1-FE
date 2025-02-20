'use client';

import shopsApi from '@/api/shops/shops.api';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Title from '../molecules/Title';
import CardDetail from '../organism/CardDetail';

function ShopDetail({ shopId }) {
  const { data: shop } = useQuery({
    queryKey: ['shop', { shopId }],
    queryFn: () => shopsApi.getShop(shopId),
  });

  if (!shop) return null;

  return (
    <div className="mt-[60px]">
      <Title intent="md">{shop.name}</Title>
      <div className="flex mt-[60px]">
        <div className="relative w-full aspect-[360/270] mr-20">
          <Image
            src={shop.imgUrl}
            alt={shop.name}
            fill
            className="object-cover"
          />
        </div>
        <CardDetail cardDetail={shop} bottomIntent={'seller'} />
      </div>
      <div className="mt-[120px]">
        <Title intent="md">교환 제시 목록</Title>
      </div>
    </div>
  );
}

export default ShopDetail;
