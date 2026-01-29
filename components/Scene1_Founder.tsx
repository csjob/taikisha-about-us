'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingClouds from './FloatingClouds';

gsap.registerPlugin(ScrollTrigger);

export default function Scene1_Founder() {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    // contentWrapperRef removed as unused
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Entrance Animation
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Image Fade In + Up
            tl.from(imageWrapperRef.current, {
                y: 50,
                opacity: 0,
                duration: 1.2,
            });

            // Cards Staggered Entrance
            tl.from([card1Ref.current, card2Ref.current], {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
            }, '-=0.6');

            // 2. Parallax & Scroll Transition
            // Background Parallax
            gsap.to(bgRef.current, {
                yPercent: 20, // Move down 20% by end of scroll
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Image Parallax (slower than scroll)
            gsap.to(imageWrapperRef.current, {
                y: 50,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Transition to Scene 2 (Exit Effect) - REMOVED to prevent white gap
            // Leaving only the parallax effects above.

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden flex items-center pt-32 pb-20 lg:py-0 font-outfit">

            {/* Background Image - Parallax Container */}
            <div ref={bgRef} className="absolute inset-0 z-[-10] scale-100"> {/* Removed extra scaling to reduce zoom */}
                <Image
                    src="/images/scene1-bg.jpg"
                    alt="Scene 1 Background"
                    fill
                    className="object-cover object-top" // Force alignment to top
                />
                {/* Gradients: Increased opacity slightly for visibility, but kept gradients for text safety */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[0px]" /> {/* Dark overlay for better text contrast */}
            </div>

            {/* Moving Clouds Layer (z-[-5]) */}
            <FloatingClouds />

            <div className="container mx-auto px-6 md:px-12 h-full flex flex-col items-center relative z-10">

                {/* Top Row: Founder Image + Founder Director Box */}
                <div className="flex flex-col lg:flex-row w-full items-start justify-between">

                    {/* Founder Image - Left Side with margin-left */}
                    <div ref={imageWrapperRef} className="relative w-[240px] aspect-[3/4] drop-shadow-2xl mb-12 lg:mb-0 self-center lg:self-start ml-12">
                        <Image
                            src="/images/founder.png"
                            alt="N.A. Makwana - Founder Director"
                            fill
                            className="object-contain object-top"
                            priority
                        />
                    </div>

                    {/* Founder Director Box - Right Side, placed at top with margin-top */}
                    <div ref={card1Ref} className="bg-blue-600/80 backdrop-blur-md p-5 border-l-[6px] border-blue-900 w-full max-w-[33rem] self-center lg:self-end lg:ml-10 mt-12">
                        <div className="mb-1">
                            <h2 className="text-3xl lg:text-5xl font-bebas font-bold text-white tracking-wide leading-none">
                                N.A. MAKWANA
                            </h2>
                            <p className="text-xs font-bold text-blue-100 uppercase tracking-[0.3em] mt-1">
                                Founder Director
                            </p>
                        </div>
                        <blockquote className="text-white italic font-light text-base leading-relaxed mt-2 border-t border-white/20 pt-2 text-justify [text-align-last:justify] w-full">
                            "Time is the greatest asset in human life and to be well planned and not wasted.
                            Every man striving to achieve highest quality with ethical working can change
                            not only the nation, but also the whole world."
                        </blockquote>
                    </div>
                </div>

                {/* Bottom Row: Customers First Box with margin-left */}
                <div ref={card2Ref} className="bg-emerald-600/80 backdrop-blur-md text-white p-5 border-l-[6px] border-emerald-900 w-full max-w-2xl mt-10 self-start shadow-lg ">
                    <h3 className="text-3xl font-bebas font-bold mb-2 text-white tracking-widest border-b border-white/20 pb-2">
                        CUSTOMERS FIRST
                    </h3>
                    <div className="space-y-1 text-emerald-50 leading-relaxed font-medium">
                        <p className="text-justify [text-align-last:justify] text-[0.938rem]">
                            Customers are defined as Overall Society in a broad sense Spirit of &quot;Customers First&quot; is to win
                            persistent trust from the customer, To achieve this goal, we have to follow our own conscience and
                            make the utmost efforts in every doing based on the belief that the behaviour of individuals or the
                            company will bring benefit and happiness to one&apos;s counterpart.
                        </p>
                    </div>
                </div>
            </div>

        </section>
    );
}
