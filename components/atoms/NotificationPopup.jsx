import notificationsApi from '@/api/notifications/notifications.api';
import IcBack from '@/assets/images/ic-back.png';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

function NotificationPopup({ isOpen, setIsOpen }) {
  const router = useRouter();

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

  // TODO: useQuery로 getNotificationsOfMe를 받아서 notifications를 대체하기
  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsApi.getNotificationsOfMe,
  });

  const notifications = data || [];

  const menuRef = useRef(null);

  const handleClickNotification = (link) => {
    router.push(`${link}`);
    setIsOpen(false);
  };

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
        className="min-h-[108px] sm:min-h-screen max-h-[540px] sm:max-h-screen overflow-y-auto 
        [&::-webkit-scrollbar]:w-2 
        [&::-webkit-scrollbar-track]:bg-[#161616]
        [&::-webkit-scrollbar-thumb]:bg-[#333]
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:hover:bg-[#efff04]"
      >
        <div className="hidden sm:flex items-center relative p-4 border-b border-[#333]">
          <Image
            src={IcBack}
            alt="돌아가기 아이콘"
            className=" text-white absolute left-4 w-4 sm:w-[22px] mr-6 sm:mr-0 cursor-pointer "
            onClick={() => setIsOpen(false)}
          />
          <h2 className="text-white text-lg font-bold flex-1 text-center">
            알림
          </h2>
        </div>
        {notifications.map((notification) => (
          <div
            onClick={() => handleClickNotification(notification.link)}
            key={notification.id}
            className={`font-normal text-sm text-white border-b border-[#333] p-5 
              cursor-pointer hover:bg-[#222222] first:sm:rounded-none last:sm:rounded-none last:border-none
              ${!notification.isRead ? 'bg-[#222222]' : ''}`}
          >
            <p className="mb-[10px]">{notification.message}</p>
            <p className="font-light text-xs text-[#a4a4a4]">
              {formatDate(notification.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationPopup;
