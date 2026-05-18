import { motion } from "framer-motion";
import { Counter } from "./Counter";

const STATS = [
  { v: 12, s: "+", l: "Лет на рынке" },
  { v: 847, s: "", l: "Завершённых объектов" },
  { v: 2400000, s: " м²", l: "Уложено асфальта" },
  { v: 98, s: "%", l: "Клиентов возвращаются" },
];

function fmt(n: number) {
  return n.toLocaleString("ru-RU");
}

export function Stats() {
  return (
    <section className="relative bg-asphalt py-24 md:py-32 overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {STATS.map((st, i) => (
            <motion.div
              key={st.l}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="bg-asphalt p-6 md:p-10 relative"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--orange)] to-transparent opacity-60" />
              <div className="font-display text-gold leading-none tracking-tight"
                   style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)" }}>
                {st.v >= 100000 ? (
                  <CounterBig to={st.v} suffix={st.s} />
                ) : (
                  <><Counter to={st.v} />{st.s}</>
                )}
              </div>
              <div className="mt-4 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-concrete/80">
                {st.l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CounterBig({ to, suffix }: { to: number; suffix?: string }) {
  return <span className="tabular-nums">{fmt(to)}{suffix}</span>;
}