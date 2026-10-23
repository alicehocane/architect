'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface FeaturedArchitectBannerProps {
  slug?: string;
  delayMs?: number;
}

export default function FeaturedArchitectBanner({
  slug = 'aak-architects',
  delayMs = 9000,
}: FeaturedArchitectBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const isDismissedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(`dismissed_${slug}`)) {
      return;
    }

    const timer = setTimeout(() => {
      if (!isDismissedRef.current) {
        setIsRendered(true);
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }
    }, delayMs);

    return () => clearTimeout(timer);
  }, [slug, delayMs]);

  const handleClose = () => {
    setIsVisible(false);
    isDismissedRef.current = true;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`dismissed_${slug}`, 'true');
    }
    setTimeout(() => setIsRendered(false), 350);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    const diff = e.touches[0].clientY - touchStartY;
    if (diff < 0) {
      setSwipeOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (swipeOffset < -35) {
      handleClose();
    } else {
      setSwipeOffset(0);
    }
    setTouchStartY(null);
  };

  if (!isRendered) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 sm:top-24 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none"
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translate3d(0, ${isVisible ? swipeOffset : -160}px, 0)`,
          opacity: isVisible ? 1 : 0,
        }}
        className="pointer-events-auto w-full max-w-[440px] bg-white/90 dark:bg-[#1d1d1f]/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/10 rounded-[24px] p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none"
      >
        <div className="flex items-center gap-3">
          {/* Studio Icon Badge */}
          <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-[#f5f5f7] dark:bg-white/10 flex items-center justify-center text-[#1d1d1f] dark:text-white">
            <svg
              className="w-5 h-5 text-[#0071e3]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" />
              <path d="M9 9h1M9 13h1M9 17h1" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0071e3]"></span>
            </span>
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#0066cc] bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded-md">
                Featured Practice
              </span>
            </div>
            <p className="text-[14px] font-semibold text-[#1d1d1f] dark:text-white truncate">
              AAK Architects
            </p>
            <p className="text-[12px] text-[#86868b] truncate leading-tight">
              High-performance architectural & energy design studio
            </p>
          </div>

          {/* Action Button & Close */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Link
              href="/architects/aak-architects"
              onClick={handleClose}
              className="px-3.5 py-1.5 rounded-full bg-[#0071e3] text-white text-[13px] font-medium hover:bg-[#0077ed] active:scale-95 transition-all shadow-sm"
            >
              View
            </Link>
            <button
              onClick={handleClose}
              aria-label="Close notification"
              className="w-7 h-7 flex items-center justify-center rounded-full text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Swipe Grab Bar */}
        <div className="sm:hidden flex justify-center mt-2 -mb-0.5">
          <div className="w-8 h-1 rounded-full bg-black/10 dark:bg-white/20" />
        </div>
      </div>
    </div>
  );
}