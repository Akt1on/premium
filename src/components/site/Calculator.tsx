import { useMemo, useState } from "react";
import { useSettings } from "@/lib/use-settings";
import { motion } from "framer-motion";
import { Phone, Send } from "lucide-react";

const TYPES = [
  { id: "asphalt", label: "Асфальтирование", price: 850 },
  { id: "yard", label: "Благоустройство двора", price: 1400 },
  { id: "tile", label: "Тротуарная плитка", price: 1800 },
  { id: "parking", label: "Парковка / разметка", price: 1200 },
  { id: "patch", label: "Ямочный ремонт", price: 1100 },
] as const;

const OPTIONS = [
  { id: "base", label: "Усиленное основание", add: 280 },
  { id: "curb", label: "Бордюры", add: 180 },
  { id: "marking", label: "Дорожная разметка", add: 90 },
  { id: "drain", label: "Дренаж / ливнёвка", add: 220 },
] as const;

function fmt(n: number) {
  return n.toLocaleString("ru-RU");
}

export function Calculator() {
  const { data: settings } = useSettings();
  const tel = (settings?.phone ?? "+7 (800) 000-00-00").replace(/[^+\d]/g, "");
  const tg = (settings?.telegram ?? "premiumstroe").replace(/^@/, "");
  const [type, setType] = useState<typeof TYPES[number]["id"]>("asphalt");
  const [area, setArea] = useState(1000);
  const [opts, setOpts] = useState<Record<string, boolean>>({});

  const total = useMemo(() => {
    const base = TYPES.find((t) => t.id === type)!.price;
    const adds = OPTIONS.filter((o) => opts[o.id]).reduce((s, o) => s + o.add, 0);
    return (base + adds) * area;
  }, [type, area, opts]);

  return (
    <section id="calculator" className="relative bg-graphite py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <span className="text-xs uppercase tracking-[0.4em] text-gold">Калькулятор</span>
        </div>
        <h2 className="font-display leading-[0.9] tracking-tight max-w-4xl"
            style={{ fontSize: "clamp(2.2rem, 6vw, 5.5rem)" }}>
          РАССЧИТАЙТЕ <span className="text-gold">СТОИМОСТЬ</span> ОБЪЕКТА
        </h2>
        <p className="mt-4 text-base text-concrete/80 max-w-2xl">
          Ориентировочный расчёт по средним рыночным ценам. Точная стоимость — после выезда инженера.
        </p>

        <div className="mt-12 grid lg:grid-cols-12 gap-px bg-white/10">
          <div className="lg:col-span-7 bg-asphalt p-6 md:p-10 space-y-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-concrete/60 mb-3">Тип работ</div>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setType(t.id)}
                    className={`px-4 py-2.5 text-xs uppercase tracking-widest border transition-all ${
                      type === t.id
                        ? "border-gold text-gold bg-[var(--orange)]/10"
                        : "border-white/15 text-concrete hover:border-gold hover:text-gold"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-3">
                <div className="text-[10px] uppercase tracking-[0.3em] text-concrete/60">Площадь</div>
                <div className="font-display text-2xl text-gold">{fmt(area)} м²</div>
              </div>
              <input
                type="range"
                min={100}
                max={50000}
                step={100}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-[var(--orange)] cursor-pointer"
              />
              <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-concrete/40">
                <span>100 м²</span><span>50 000 м²</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-concrete/60 mb-3">Дополнительно</div>
              <div className="grid sm:grid-cols-2 gap-2">
                {OPTIONS.map((o) => (
                  <label
                    key={o.id}
                    className={`flex items-center gap-3 px-4 py-3 border cursor-pointer transition-colors ${
                      opts[o.id] ? "border-gold bg-[var(--orange)]/10" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!opts[o.id]}
                      onChange={(e) => setOpts((p) => ({ ...p, [o.id]: e.target.checked }))}
                      className="accent-[var(--orange)]"
                    />
                    <span className="text-xs uppercase tracking-wider flex-1">{o.label}</span>
                    <span className="text-[10px] text-concrete/60">+{o.add} ₽/м²</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-asphalt p-6 md:p-10 flex flex-col justify-between relative">
            <div className="absolute inset-0 opacity-20" style={{ background: "var(--gradient-radial-orange)" }} />
            <div className="relative">
              <div className="text-[10px] uppercase tracking-[0.3em] text-concrete/60">Ориентировочно</div>
              <motion.div
                key={total}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-gold leading-none mt-3"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                от {fmt(total)} ₽
              </motion.div>
              <div className="mt-3 text-xs uppercase tracking-widest text-concrete/60">
                за объект {fmt(area)} м²
              </div>
              <div className="gold-line my-8" />
              <ul className="space-y-2 text-xs text-concrete/80">
                <li>· Выезд инженера — бесплатно</li>
                <li>· Договор и закрывающие документы</li>
                <li>· Гарантия 3 года письменно</li>
              </ul>
            </div>
            <div className="relative mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${tel}`}
                className="flex-1 inline-flex items-center justify-center gap-2 h-14 bg-gold text-asphalt font-semibold uppercase tracking-widest text-sm hover:bg-[var(--orange-glow)] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Позвонить
              </a>
              <a
                href={`https://t.me/${tg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 h-14 border border-white/20 text-white font-semibold uppercase tracking-widest text-sm hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
              >
                <Send className="w-4 h-4" />
                Telegram
              </a>
            </div>
            <p className="relative mt-3 text-[10px] uppercase tracking-widest text-concrete/40">
              Точная цена — после выезда инженера
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}