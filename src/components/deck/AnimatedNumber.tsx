import { useEffect, useState } from "react";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";

export function AnimatedNumber({
  value,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const mv = useMotionValue(0);
  const [, setTick] = useState(0);
  useEffect(() => {
    const controls = animate(mv, value, { duration, ease: [0.22, 1, 0.36, 1] });
    const unsub = mv.on("change", () => setTick((t) => t + 1));
    return () => { controls.stop(); unsub(); };
  }, [value, duration, mv]);
  const display = useTransform(mv, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString()
  );
  return (
    <span className="tabular-nums">
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
