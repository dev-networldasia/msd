import React, { useEffect, useState, useRef } from 'react';

const ScrollHandler: React.FC = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrolling) {
        const st = window.scrollY || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
          window.scrollTo(0, 1);
        } else {
          window.scrollTo(0, 0);
        }
        setLastScrollTop(st);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      scrollRef.current = e.touches[0].clientY;
      setScrolling(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (scrollRef.current < e.touches[0].clientY) {
        window.scrollTo(0, 1);
      } else {
        window.scrollTo(0, 0);
      }
    };

    const handleTouchEnd = () => {
      setScrolling(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [lastScrollTop, scrolling]);


    return (
        <div className='flex h-full flex-col overflow-y-scroll'>
            <div className="min-h-[123px]">a</div>
            <div className="min-h-[123px]">a</div>
            <div className="min-h-[123px]">a</div>
            <div className="min-h-[123px]">a</div>
            <div className="min-h-[123px]">a</div>
            <div className="min-h-[123px]">a</div>
            <div className="min-h-[123px]">a</div>
            <div className="min-h-[123px]">a</div>
            <div className="min-h-[123px]">a</div>
            <div className="min-h-[123px]">a</div>
            <div className="min-h-[123px]">a</div>
            <div className="min-h-[123px]">a</div>
            <div className="min-h-[123px]">a</div>
            <div className="h-32">f</div>
            <div className="h-32">v</div>
            <div className="h-32"></div>
            <div className="h-32">b</div>
            <div className="h-32"></div>
            <div className="h-32">b</div>
            <div className="h-32">á</div>
            <div className="h-32">a</div>
            <div className="h-32">a</div>
            <div className="h-32">a</div>
            <div className="h-32">s</div>
            <div className="h-32">s</div>
            <div className="h-32">s</div>
            <div className="h-32">s</div>
            {/* Nội dung của bạn */}
        </div>
    );
};

export default ScrollHandler;