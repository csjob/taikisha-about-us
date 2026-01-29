'use client';

import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// CONFIGURATION
const FRAME_COUNT = 100; // Total number of frames in the sequence
const IMAGE_FOLDER = '/images/scene3/sequence/';
const IMAGE_PREFIX = 'frame_'; // e.g., frame_0001.jpg
const IMAGE_EXTENSION = 'png';
const SCROLL_DISTANCE = 6000; // Total scroll pixel distance to play the sequence

export default function Scene3_Map() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const frameRef = useRef({ current: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. Preload Images
    useEffect(() => {
        const loadImages = async () => {
            const promises: Promise<void>[] = [];

            for (let i = 0; i < FRAME_COUNT; i++) {
                const img = new Image();
                const padIndex = String(i).padStart(4, '0');
                const src = `${IMAGE_FOLDER}${IMAGE_PREFIX}${padIndex}.${IMAGE_EXTENSION}`;

                img.src = src;
                imagesRef.current[i] = img;

                // Decode if possible, but resolve immediately on load/error
                const p = new Promise<void>((resolve) => {
                    img.onload = () => {
                        // Try to decode for smoother playback
                        if (img.decode) {
                            img.decode().catch(() => { }).finally(() => resolve());
                        } else {
                            resolve();
                        }
                    };
                    img.onerror = () => resolve();
                });

                promises.push(p);

                imagesRef.current[0].onload = () => {
                    setIsLoaded(true);
                };

            }

            // Don’t block rendering — mark as loaded once the *first frame* is ready
            await promises[0];
            setIsLoaded(true);

            // Continue decoding the rest in background
            Promise.all(promises).then(() => {
                console.log('Scene 3: All images loaded/decoded.');
            });
        };

        loadImages();
    }, []);

    // 2. Render Function
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Ensure Canvas Dimensions Match Window (Full Screen)
        const width = canvas.width;
        const height = canvas.height;

        const img = imagesRef.current[index];

        // Clear Canvas
        ctx.fillStyle = '#0f172a'; // Slate 900 Background
        ctx.fillRect(0, 0, width, height);

        if (img && img.complete && img.naturalHeight !== 0) {
            // Draw Image (Cover Fit with Vertical Parallax)
            const hRatio = width / img.width;
            const vRatio = height / img.height;
            const ratio = Math.max(hRatio, vRatio);

            const scaledWidth = img.width * ratio;
            const scaledHeight = img.height * ratio;

            const centerShift_x = (width - scaledWidth) / 2;

            // Vertical Parallax Logic
            let centerShift_y = 0; // Default: top aligned

            if (scaledHeight > height) {
                // If image is taller than canvas, pan from Top to Bottom
                const progress = index / (FRAME_COUNT - 1);
                const maxY = 0; // Top aligned
                const minY = height - scaledHeight; // Bottom aligned
                centerShift_y = maxY + (minY - maxY) * progress;
            } else {
                // If image fits within canvas, center it
                centerShift_y = (height - scaledHeight) / 2;
            }

            ctx.drawImage(
                img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, scaledWidth, scaledHeight
            );
        } else {
            // Fallback: Draw Placeholder
            ctx.fillStyle = '#1e293b'; // Slate 800
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#22d3ee'; // Cyan 400
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.font = 'bold 80px sans-serif';
            ctx.fillText(`${index}`, width / 2, height / 2);

            ctx.font = '24px sans-serif';
            ctx.fillStyle = '#94a3b8'; // Slate 400
            ctx.fillText('Image Missing', width / 2, height / 2 + 60);
            ctx.fillText(`Expected: ${IMAGE_FOLDER}${IMAGE_PREFIX}${String(index).padStart(4, '0')}.${IMAGE_EXTENSION}`, width / 2, height / 2 + 90);
        }
    };

    // 3. GSAP Animation
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(frameRef.current, {
                current: FRAME_COUNT - 1,
                snap: 'current',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: `+=${SCROLL_DISTANCE}`,
                    pin: true,
                    scrub: 0.5,
                    // onUpdate: () => {
                    //     const frameIndex = Math.min(
                    //         FRAME_COUNT - 1,
                    //         Math.round(frameRef.current.current)
                    //     );
                    //     renderFrame(frameIndex);
                    // }
                    onUpdate: () => {
                        const frameIndex = Math.min(
                            FRAME_COUNT - 1,
                            Math.round(frameRef.current.current)
                        );
                        requestAnimationFrame(() => renderFrame(frameIndex));
                    }
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []); // Run once on mount

    // 4. Resize Handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Re-render current frame
                const currentIndex = Math.min(FRAME_COUNT - 1, Math.round(frameRef.current.current));
                renderFrame(currentIndex);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="relative w-full bg-slate-900">
            {/* Header scrolls normally */}
            <div className="container mx-auto px-6 md:px-12 py-20">
                <div className="pl-6 border-l-[8px] border-cyan-400 inline-block">
                    <h2 className="text-4xl md:text-5xl font-bebas font-bold italic text-white tracking-wide shadow-sm uppercase">
                        Taikisha India Footprint
                    </h2>
                </div>
            </div>

            {/* Spacer before canvas */}
            <div className="h-40 md:h-60"></div> {/* adjust height as needed */}

            {/* Canvas pinned separately */}
            <div
                ref={containerRef}
                className="relative w-full h-screen overflow-hidden"
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full block"
                />

                {!isLoaded && (
                    <div className="absolute bottom-10 right-10 z-50">
                        <div className="text-cyan-400 font-mono text-xs animate-pulse">
                            LOADING ASSETS...
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
