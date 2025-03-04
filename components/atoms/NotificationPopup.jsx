import notificationsApi from '@/api/notifications/notifications.api';
import IcBack from '@/assets/images/ic-back.png';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

function NotificationPopup({ isOpen, setIsOpen, notifications }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const TIME_SETTING = {
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
    WEEK: 7 * 24 * 60 * 60 * 1000,
    MONTH: 30 * 24 * 60 * 60 * 1000,
    YEAR: 365 * 24 * 60 * 60 * 1000,
  };

  const formatDate = (dateString) => {
    const now = new Date();
    const diff = now - new Date(dateString);

    if (diff < TIME_SETTING.HOUR)
      return `${Math.floor(diff / TIME_SETTING.MINUTE)}분 전`;
    if (diff < TIME_SETTING.DAY)
      return `${Math.floor(diff / TIME_SETTING.HOUR)}시간 전`;
    if (diff < TIME_SETTING.WEEK)
      return `${Math.floor(diff / TIME_SETTING.DAY)}일 전`;
    if (diff < TIME_SETTING.MONTH)
      return `${Math.floor(diff / TIME_SETTING.WEEK)}주일 전`;
    if (diff < TIME_SETTING.YEAR)
      return `${Math.floor(diff / TIME_SETTING.MONTH)}개월 전`;
    return `${Math.floor(diff / TIME_SETTING.YEAR)}년 전`;
  };

  const menuRef = useRef(null);

  const { mutate: setIsReadToTrue } = useMutation({
    mutationFn: (notificationId) =>
      notificationsApi.setToTrueIsReadOfNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const handleClickNotification = (link, id) => {
    router.push(`${link}`);
    setIsOpen(false);
    setIsReadToTrue(id);
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
            onClick={() =>
              handleClickNotification(notification.link, notification.id)
            }
            key={notification.id}
            className={`font-normal text-sm ${
              !notification.isRead ? '' : 'text-[#a4a4a4]'
            } border-b border-[#333] p-5 
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
