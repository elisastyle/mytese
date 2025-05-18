'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import moment from 'jalali-moment'; // برای تاریخ شمسی

// تعریف تایپ نظرات
interface Testimonial {
  id: string;
  house_id: string | null;
  user_id: string | null;
  title: string | null;
  caption: string | null;
  rating: string | null;
  created_at: string;
  parent_comment_id: string | null;
}

export default function TestimonialsCarousel() {
  const swiperRef = useRef<any>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [navigating, setNavigating] = useState<boolean>(false);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await axios.get<Testimonial[]>('https://delta-project.liara.run/api/comments');
        setTestimonials(response.data);
      } catch (error) {
        console.error('خطا در دریافت نظرات:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const handleNavigation = (direction: 'prev' | 'next') => {
    setNavigating(true);
    if (direction === 'prev') {
      swiperRef.current?.slidePrev();
    } else {
      swiperRef.current?.slideNext();
    }
    setTimeout(() => setNavigating(false), 500); // بعد از 500 میلی‌ثانیه، لودینگ خاموش می‌شود
  };

  const formatDate = (date: string) => {
    if (date) {
      return moment(date).locale('fa').format('D MMMM YYYY'); // تبدیل به تاریخ شمسی
    }
    return '';
  };

  // بررسی وضعیت اسلاید برای فلش‌hgها
  const handleSlideChange = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 text-right">
      <h2 className="text-xl font-bold mb-6">نظرات کاربران</h2>

      {loading && (
        <div className="w-full flex justify-center items-center py-10">
          <span className="inline-block w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
        </div>
      )}

      {!loading && (
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          spaceBetween={20}
          slidesPerView={1}
          loop={false}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          dir="rtl"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-[#586CFF] text-white rounded-2xl p-6 h-[426px] flex flex-col justify-between relative shadow-md">
                <p className="text-sm leading-relaxed mb-4">
                  {item.caption && item.caption.trim() !== '' ? item.caption : 'بدون متن'}
                </p>
                <div className="flex flex-col items-start text-xs mt-4 ms-12">
                  <span className="font-semibold">
                    {item.title && item.title.trim() !== '' ? item.title : 'کاربر ناشناس'}
                  </span>
                  <span className="text-gray-200 text-[10px] mt-1">
                    {formatDate(item.created_at)}
                  </span>
                </div>
                <div className="absolute  bottom-4 right-4 w-12 h-12 rounded-full overflow-hidden bg-white shadow-md">
                  <img
                    src="https://ui-avatars.com/api/?name=User&background=FFFFFF&color=000"
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="flex justify-start items-center mt-6 gap-4">
        <div className="w-5 h-5 flex items-center justify-center">
          {navigating && (
            <span className="inline-block w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
          )}
        </div>
        <button
          onClick={() => handleNavigation('prev')}
          className={`text-${isBeginning ? 'gray-400' : 'black'} text-[40px] hover:scale-110 transition mt-[-20px]`}
        >
          ←
        </button>
        <button
  onClick={() => handleNavigation('next')}
  className={`hover:scale-110 transition border-none mt-[-20px] bg-transparent mt-[-20px]`}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="70"
    height="24"
    viewBox="0 0 24 24"
    fill={isEnd ? 'gray' : 'black'}
    stroke={isEnd ? 'gray' : 'black'}
    strokeWidth="0.1"
  >
    <path d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9V7ZM41.7071 8.70711C42.0976 8.31658 42.0976 7.68342 41.7071 7.29289L35.3431 0.928932C34.9526 0.538408 34.3195 0.538408 33.9289 0.928932C33.5384 1.31946 33.5384 1.95262 33.9289 2.34315L39.5858 8L33.9289 13.6569C33.5384 14.0474 33.5384 14.6805 33.9289 15.0711C34.3195 15.4616 34.9526 15.4616 35.3431 15.0711L41.7071 8.70711ZM1 9H41V7H1V9Z" fill="currentColor" />
  </svg>
</button>
      </div>
    </div>
  );
}
