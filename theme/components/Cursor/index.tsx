import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import './index.css';

interface CursorState {
  width: number;
  height: number;
  borderRadius: number;
}

const DEFAULT_STATE: CursorState = {
  width: 16,
  height: 16,
  borderRadius: 50,
};

const TEXT_STATE: CursorState = {
  width: 3,
  height: 24,
  borderRadius: 2,
};

const LINK_STATE: CursorState = {
  width: 48,
  height: 48,
  borderRadius: 50,
};

function getTargetState(el: Element | null): CursorState {
  if (!el) return DEFAULT_STATE;

  const tag = el.tagName.toLowerCase();
  const isLink = tag === 'a' || tag === 'button' || el.closest('a') || el.closest('button');

  if (isLink) return LINK_STATE;

  const style = window.getComputedStyle(el);
  const isText =
    el.childNodes.length > 0 &&
    Array.from(el.childNodes).some((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim());

  if (isText || tag === 'p' || tag === 'span' || tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'code' || tag === 'pre') {
    const fontSize = parseFloat(style.fontSize) || 16;
    return {
      width: 3,
      height: fontSize * 1.4,
      borderRadius: 2,
    };
  }

  return DEFAULT_STATE;
}

export default function Cursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [state, setState] = useState<CursorState>(DEFAULT_STATE);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 400, mass: 0.3 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 400, mass: 0.3 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!visible) setVisible(true);

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const target = document.elementFromPoint(e.clientX, e.clientY);
        const newState = getTargetState(target);
        setState((prev) => {
          if (
            prev.width === newState.width &&
            prev.height === newState.height &&
            prev.borderRadius === newState.borderRadius
          )
            return prev;
          return newState;
        });
      });
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, visible]);

  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="custom-cursor"
      style={{
        x: springX,
        y: springY,
        opacity: visible ? 1 : 0,
      }}
      animate={{
        width: state.width,
        height: state.height,
        borderRadius: state.borderRadius,
      }}
      transition={{
        width: { type: 'spring', damping: 20, stiffness: 300 },
        height: { type: 'spring', damping: 20, stiffness: 300 },
        borderRadius: { type: 'spring', damping: 20, stiffness: 300 },
      }}
    />
  );
}
