'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export default function MotionWrapper({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: MotionWrapperProps) {
  let initialX = 0;
  let initialY = 0;

  if (direction === 'up') initialY = 30;
  if (direction === 'down') initialY = -30;
  if (direction === 'left') initialX = 30;
  if (direction === 'right') initialX = -30;

  const variants: Variants = {
    hidden: { opacity: 0, x: initialX, y: initialY },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
