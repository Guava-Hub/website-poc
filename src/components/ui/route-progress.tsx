"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

interface RouteProgressProps {
    isAnimating: boolean;
    progress: number;
}

/**
 * RouteProgress Component
 * A creative, modern animated progress bar using framer-motion
 * Features:
 * - Smooth gradient animation
 * - Particle effects
 * - Glowing pulse effect
 * - Dynamic color transitions
 * - Trailing sparkles
 */
export function RouteProgress({ isAnimating, progress }: RouteProgressProps) {
    const particles = Array.from({ length: 8 }, (_, i) => i);

    return (
        <AnimatePresence>
            {isAnimating && (
                <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
                    {/* Main Progress Bar with Gradient */}
                    <motion.div
                        className="relative h-1 shadow-lg"
                        initial={{ width: "0%", opacity: 0 }}
                        animate={{
                            width: `${progress}%`,
                            opacity: 1,
                        }}
                        exit={{
                            width: "100%",
                            opacity: 0,
                            transition: { duration: 0.4 }
                        }}
                        transition={{
                            width: { duration: 0.3, ease: "easeOut" },
                            opacity: { duration: 0.2 }
                        }}
                        style={{
                            background: "linear-gradient(90deg, #262D3E 0%, #F77419 50%, #262D3E 100%)",
                            boxShadow: "0 0 20px rgba(247, 116, 25, 0.6)",
                        }}
                    >
                        {/* Animated Gradient Overlay */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                            animate={{
                                x: ["-100%", "200%"],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />

                        {/* Glowing Edge Effect */}
                        <motion.div
                            className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white/80 to-transparent"
                            animate={{
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Pulsing Glow */}
                        <motion.div
                            className="absolute inset-0 blur-md"
                            style={{
                                background: "linear-gradient(90deg, rgba(38, 45, 62, 0.4) 0%, rgba(247, 116, 25, 0.6) 50%, rgba(38, 45, 62, 0.4) 100%)",
                            }}
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>

                    {/* Floating Particles */}
                    <div className="relative h-0">
                        {particles.map((i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 rounded-full"
                                initial={{
                                    left: `${(progress * (i + 1)) / particles.length}%`,
                                    top: 0,
                                    opacity: 0,
                                    scale: 0,
                                }}
                                animate={{
                                    left: `${(progress * (i + 1)) / particles.length}%`,
                                    top: [0, -20, -40],
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                    backgroundColor: [
                                        "rgba(247, 116, 25, 0.8)",
                                        "rgba(38, 45, 62, 0.8)",
                                        "rgba(247, 116, 25, 0.8)",
                                    ],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                    ease: "easeOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* Secondary Progress Line (Trailing Effect) */}
                    <motion.div
                        className="absolute top-0 left-0 h-0.5 blur-sm"
                        style={{
                            background: "linear-gradient(90deg, rgba(38, 45, 62, 0.5) 0%, rgba(247, 116, 25, 0.5) 100%)",
                        }}
                        initial={{ width: "0%", opacity: 0 }}
                        animate={{
                            width: `${Math.max(0, progress - 10)}%`,
                            opacity: 0.6,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            width: { duration: 0.5, ease: "easeOut" },
                            opacity: { duration: 0.3 }
                        }}
                    />

                    {/* Sparkle Effects at the Leading Edge */}
                    {progress > 5 && (
                        <>
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={`sparkle-${i}`}
                                    className="absolute w-2 h-2"
                                    style={{
                                        left: `${progress}%`,
                                        top: -4,
                                    }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: [0, 1.5, 0],
                                        opacity: [0, 1, 0],
                                        x: [0, (i - 1) * 15],
                                        y: [0, -10],
                                        rotate: [0, 180],
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeOut",
                                    }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="w-full h-full"
                                    >
                                        <path
                                            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                                            fill="url(#sparkle-gradient)"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="sparkle-gradient"
                                                x1="2"
                                                y1="12"
                                                x2="22"
                                                y2="12"
                                            >
                                                <stop offset="0%" stopColor="#F77419" />
                                                <stop offset="50%" stopColor="#262D3E" />
                                                <stop offset="100%" stopColor="#F77419" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </motion.div>
                            ))}
                        </>
                    )}

                    {/* Ripple Effect */}
                    <motion.div
                        className="absolute top-0 h-1 rounded-full blur-xl"
                        style={{
                            background: "linear-gradient(90deg, rgba(247, 116, 25, 0.3) 0%, rgba(38, 45, 62, 0.3) 100%)",
                        }}
                        initial={{ width: "0%", opacity: 0 }}
                        animate={{
                            width: `${progress + 5}%`,
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            width: { duration: 0.4, ease: "easeOut" },
                            opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                        }}
                    />

                    {/* Bottom Glow Line */}
                    <motion.div
                        className="absolute top-1 left-0 h-2 blur-sm"
                        style={{
                            background: "linear-gradient(180deg, rgba(247, 116, 25, 0.2) 0%, transparent 100%)",
                        }}
                        initial={{ width: "0%", opacity: 0 }}
                        animate={{
                            width: `${progress}%`,
                            opacity: 0.8,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            width: { duration: 0.3, ease: "easeOut" },
                        }}
                    />

                    {/* Completion Burst Effect */}
                    {progress >= 100 && (
                        <motion.div
                            className="absolute top-0 left-0 right-0 h-1"
                            style={{
                                background: "linear-gradient(90deg, #F77419 0%, #262D3E 50%, #F77419 100%)",
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0.8, 1.2, 1],
                            }}
                            transition={{ duration: 0.4 }}
                        />
                    )}
                </div>
            )}
        </AnimatePresence>
    );
}
