'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Scene3_Map() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = imageWrapperRef.current;
      const container = containerRef.current;

      if (!wrapper || !container) return;

      gsap.to(wrapper, {
        y: () => -(wrapper.scrollHeight - window.innerHeight), // pan upward
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${wrapper.scrollHeight - window.innerHeight}`, // scroll distance = overflow
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-slate-900 overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-10 left-0 w-full z-50 flex justify-center pointer-events-none">
        <div className="container mx-auto px-6 md:px-12">
          <div className="pl-6 border-l-[8px] border-cyan-400 inline-block drop-shadow-md">
            <h2 className="text-4xl md:text-5xl font-bebas font-bold italic text-white tracking-wide shadow-sm uppercase">
              Taikisha India Footprint
            </h2>
          </div>
        </div>
      </div>

      {/* Tall Image that pans upward */}
      <div
        ref={imageWrapperRef}
        className="relative w-full md:w-[90%] lg:w-[80%] mx-auto pt-32 md:pt-40"
      >
        <Image
          src="/images/scene3/map-tall.png"
          alt="Taikisha India Footprint"
          width={1920}
          height={3000}
          className="object-cover w-full h-auto rounded-t-xl"
          priority
          onLoad={() => ScrollTrigger.refresh()}
        />
      </div>
    </section>
  );
}