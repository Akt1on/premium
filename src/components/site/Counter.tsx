import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { 
    once: true, 
    margin: "-80px", 
    amount: 0.2 
  });
  
  const [val, setVal] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!inView || hasAnimated) return;

    setHasAnimated(true);
    let raf: number;
    const start = performance.now();
    const duration = 1800;

    const tick = (t: number) => {
      const elapsed = t - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // плавное затухание

      setVal(Math.floor(to * eased));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setVal(to); // точно ставим конечное значение
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [inView, to, hasAnimated]);

  // 🔥 Страховка для мобильных — если через 2 секунды всё ещё 0
  useEffect(() => {
    if (val === 0 && to > 0) {
      const timer = setTimeout(() => {
        setVal(to);
        setHasAnimated(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [val, to]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </motion.span>
  );
}
