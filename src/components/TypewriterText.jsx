'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = ['Web Developer', 'Full-Stack Developer'];

// Timing constants (ms)
const TYPE_SPEED = 70;   // delay between each typed character
const DELETE_SPEED = 40;   // delay between each deleted character
const PAUSE_AFTER_TYPE = 1800; // pause when word is fully typed
const PAUSE_AFTER_DELETE = 300;  // pause after fully deleting before next word

export default function TypewriterText({ className = '' }) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Use a ref for the timeout so cleanup is always accurate
  const timerRef = useRef(null);

  useEffect(() => {
    const currentWord = WORDS[wordIndex];

    function tick() {
      if (!isDeleting) {
        // ── Typing forward ──────────────────────────────────────────────
        if (displayed.length < currentWord.length) {
          setDisplayed(currentWord.slice(0, displayed.length + 1));
          timerRef.current = setTimeout(tick, TYPE_SPEED);
        } else {
          // Word fully typed → pause then start deleting
          timerRef.current = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
        }
      } else {
        // ── Deleting ─────────────────────────────────────────────────────
        if (displayed.length > 0) {
          setDisplayed(displayed.slice(0, -1));
          timerRef.current = setTimeout(tick, DELETE_SPEED);
        } else {
          // Word fully deleted → move to next word
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % WORDS.length);
          timerRef.current = setTimeout(tick, PAUSE_AFTER_DELETE);
        }
      }
    }

    timerRef.current = setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);

    return () => clearTimeout(timerRef.current);
  }, [displayed, isDeleting, wordIndex]);

  return (
    <span className={`inline-flex items-center gap-0 ${className}`}>
      <AnimatePresence mode="popLayout">
        {displayed.split('').map((char, i) => (
          <motion.span
            key={`${wordIndex}-${i}-${char}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.08, ease: 'easeOut' }}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Blinking cursor */}
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear', times: [0, 0.45, 0.5, 0.95] }}
        style={{ display: 'inline-block', marginLeft: '2px', fontWeight: 700 }}
      >
        |
      </motion.span>
    </span>
  );
}
