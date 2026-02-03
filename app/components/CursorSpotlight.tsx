'use client';
import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CursorSpotlight() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the spotlight movement
    const springConfig = { damping: 25, stiffness: 700 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 200); // Center the 400px spotlight
            mouseY.set(e.clientY - 200);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-50 mix-blend-screen opacity-15"
            style={{
                x: springX,
                y: springY,
                background: 'radial-gradient(circle, rgba(88, 166, 255, 0.8) 0%, rgba(0,0,0,0) 70%)',
            }}
        />
    );
}
