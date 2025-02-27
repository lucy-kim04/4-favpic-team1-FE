import IcBack from '@/assets/images/ic-back.png';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

function NotificationPopup({ isOpen, setIsOpen }) {
  const formatDate = (dateString) => {
    const now = new Date();
    const notificationDate = new Date(dateString);
    const diffMs = now - notificationDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 24) {
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes}분 전`;
      }
      return `${diffHours}시간 전`;
    }

    const year = notificationDate.getFullYear();
    const month = notificationDate.getMonth() + 1;
    const day = notificationDate.getDate();
    const hours = String(notificationDate.getHours()).padStart(2, '0');
    const minutes = String(notificationDate.getMinutes()).padStart(2, '0');

    if (now.getFullYear() === year) {
      return `${month}월 ${day}일 ${hours}:${minutes}`;
    }

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  };

  const notifications = [
    {
      id: 1,
      type: 'PURCHASE',
      message: '구매자님이 [카드명] 카드를 2장 구매했습니다.',
      date: '2024-01-20 14:30:00',
      isRead: false,
    },
    {
      id: 2,
      type: 'EXCHANGE_REQUEST',
      message: '교환자님이 [카드명] 카드에 교환을 제안했습니다.',
      date: '2024-01-20 13:15:00',
      isRead: false,
    },
    {
      id: 3,
      type: 'SOLD_OUT',
      message: '[카드명] 카드가 품절되었습니다.',
      date: '2024-01-20 12:00:00',
      isRead: true,
    },
    {
      id: 4,
      type: 'MY_PURCHASE',
      message: '[카드명] 카드를 3장 구매했습니다.',
      date: '2024-01-20 11:45:00',
      isRead: true,
    },
    {
      id: 5,
      type: 'EXCHANGE_ACCEPT',
      message: '[카드명] 카드의 교환 요청을 수락했습니다.',
      date: '2024-01-20 10:30:00',
      isRead: true,
    },
    {
      id: 6,
      type: 'MY_EXCHANGE_REQUEST',
      message: '[카드명] 카드에 교환을 요청했습니다.',
      date: '2024-01-20 09:15:00',
      isRead: true,
    },
    {
      id: 7,
      type: 'EXCHANGE_COMPLETE',
      message: '[카드명] 카드의 교환이 성사되었습니다.',
      date: '2024-01-20 08:00:00',
      isRead: true,
    },
  ];

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  return (
    <div
      ref={menuRef}
      className={`
      absolute sm:fixed top-16 sm:top-0 right-0 
      w-[300px] sm:w-full sm:h-full 
      bg-[#161616] rounded-xl sm:rounded-none shadow-lg p-0
      ${
        isOpen
          ? 'opacity-100 sm:translate-x-0'
          : 'opacity-0 sm:translate-x-full pointer-events-none'
      }
      transition-opacity sm:transition-transform duration-300 ease-in-out
    `}
    >
      <div
        className='min-h-[108px] sm:min-h-screen max-h-[540px] sm:max-h-screen overflow-y-auto 
        [&::-webkit-scrollbar]:w-2 
        [&::-webkit-scrollbar-track]:bg-[#161616]
        [&::-webkit-scrollbar-thumb]:bg-[#333]
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:hover:bg-[#efff04]'
      >
        <div className='hidden sm:flex items-center relative p-4 border-b border-[#333]'>
          <Image
            src={IcBack}
            alt='돌아가기 아이콘'
            className=' text-white absolute left-4 w-4 sm:w-[22px] mr-6 sm:mr-0 cursor-pointer '
            onClick={() => setIsOpen(false)}
          />
          <h2 className='text-white text-lg font-bold flex-1 text-center'>
            알림
          </h2>
        </div>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`font-normal text-sm text-white border-b border-[#333] p-5 
              cursor-pointer hover:bg-[#222222] first:sm:rounded-none last:sm:rounded-none last:border-none
              ${!notification.isRead ? 'bg-[#222222]' : ''}`}
          >
            <p className='mb-[10px]'>{notification.message}</p>
            <p className='font-light text-xs text-[#a4a4a4]'>
              {formatDate(notification.date)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationPopup;
