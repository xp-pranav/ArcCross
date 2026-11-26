import React, { useCallback, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { useLandingTheme } from '../LandingThemeContext';

interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  dark?: boolean;
  interactive?: boolean;
}

/**
 * Reusable Liquid Glass surface with cursor-tracking specular sheen
 * and layered frosted translucency. Adapts automatically to the landing
 * Light/Dark theme unless `dark` is explicitly specified.
 */
export const LiquidGlassCard: React.FC<LiquidGlassProps> = ({
  children,
  dark,
  interactive = true,
  className = '',
  onPointerMove,
  onPointerLeave,
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useLandingTheme();
  const ref = useRef<HTMLDivElement>(null);

  const effectiveDark = dark ?? isDark;

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!prefersReducedMotion && interactive && e.pointerType === 'mouse' && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        ref.current.style.setProperty('--mx', `${x.toFixed(1)}%`);
        ref.current.style.setProperty('--my', `${y.toFixed(1)}%`);
        ref.current.style.setProperty('--sheen-opacity', '1');
      }
      onPointerMove?.(e);
    },
    [interactive, onPointerMove, prefersReducedMotion]
  );

  const handlePointerLeave = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (ref.current) {
        ref.current.style.setProperty('--sheen-opacity', '0');
      }
      onPointerLeave?.(e);
    },
    [onPointerLeave]
  );

  const classes = [
    effectiveDark ? 'ac-glass--dark' : 'ac-glass',
    interactive ? 'ac-glass-interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...rest}
    >
      {children}
    </div>
  );
};
