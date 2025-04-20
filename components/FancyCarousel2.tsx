'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { useEffect, useRef, useState } from 'react';

const images = [
  '/bg-organic4.jpg',
  '/bg-organic2.jpg',
  '/bg-organic3.jpg',
];

export default function FancyCarousel() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [navReady, setNavReady] = useState(false);

  
  useEffect(() => {
    setNavReady(true);    
  }, []);

  return (
    <div className="relative lg:max-w-lg md:max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-2xl group">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000 }}
        effect="fade"
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          // Assign navigation refs
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="h-[350px] sm:h-[400px] md:h-[500px] w-full"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`Slide ${idx}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        ref={prevRef}
        className="flex items-center justify-center absolute left-3 top-1/2 z-10
        -translate-y-1/2 bg-white/50 text-black px-3 py-2 rounded-full 
        backdrop-blur hover:bg-white transition"
      >
        ◀
      </button>
      <button
        ref={nextRef}
        className="flex items-center justify-center absolute right-3 top-1/2 z-10
        -translate-y-1/2 bg-white/50 text-black px-3 py-2 rounded-full 
        backdrop-blur hover:bg-white transition"
      >
        ▶
      </button>
    </div>
  );
}
