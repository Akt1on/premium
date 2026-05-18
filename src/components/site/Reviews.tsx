import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";

const REVIEWS = [
  { name: "Алексей Воронцов", role: "Главный инженер", company: "ГК «Метрополис»", text: "Уложили 4200 м² парковки за 3 ночи без остановки работы ТЦ. Качество шва идеальное, гарантию закрепили договором.", area: "4 200 м²" },
  { name: "Марина Калинина", role: "Директор по эксплуатации", company: "ЖК «Резиденция Парк»", text: "Благоустройство двора — плитка, бордюры, дренаж. Сделали под ключ, согласовали с управляющей компанией. Жители довольны.", area: "1 800 м²" },
  { name: "Дмитрий Соколов", role: "Учредитель", company: "Логопарк «Истра»", text: "Для нашего складского комплекса делали подъездные пути и площадку. Соблюли сроки даже при -18°C. Рекомендую.", area: "12 500 м²" },
  { name: "Ирина Лебедева", role: "Управляющая", company: "Бизнес-центр «Гранд»", text: "Ямочный ремонт за одну ночь — утром клиенты ничего не заметили. Чисто, аккуратно, с разметкой и без претензий.", area: "320 м²" },
  { name: "Сергей Громов", role: "Главный архитектор", company: "Коттеджный посёлок «Сосны»", text: "Дороги общего пользования + индивидуальные подъезды к 47 участкам. Проект сложный, но ребята справились на отлично.", area: "8 600 м²" },
  { name: "Анна Серебрякова", role: "Заказчик", company: "Частный объект, Истра", text: "Подъезд к дому и площадка у бани. Приехали вовремя, всё чисто, никакой лишней техники. Цена — честная.", area: "650 м²" },
];

export function Reviews() {
  return (
    <section id="reviews" className="relative bg-asphalt py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <span className="text-xs uppercase tracking-[0.4em] text-gold">Отзывы клиентов</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <h2 className="font-display leading-[0.9] tracking-tight max-w-4xl"
              style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}>
            ГОВОРЯТ <span className="text-gold">КЛИЕНТЫ</span>
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[var(--orange)] text-[var(--orange)]" />
              ))}
            </div>
            <div className="text-sm text-concrete">
              <span className="font-display text-2xl text-gold">4.9</span> из 5 · 127 отзывов
            </div>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory -mx-6 px-6 lg:mx-0 lg:px-0">
          {REVIEWS.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="snap-start shrink-0 w-[88vw] sm:w-[420px] bg-graphite p-7 md:p-8 border border-white/5 hover:border-[var(--orange)]/30 transition-colors"
            >
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold">
                <BadgeCheck className="w-4 h-4" />
                Проверенный клиент
              </div>
              <div className="mt-3 flex">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-[var(--orange)] text-[var(--orange)]" />
                ))}
              </div>
              <p className="mt-5 text-base leading-relaxed text-concrete">«{r.text}»</p>
              <div className="mt-6 pt-5 border-t border-white/10 flex items-end justify-between gap-3">
                <div>
                  <div className="font-display text-lg">{r.name}</div>
                  <div className="text-xs text-concrete/60 mt-0.5">{r.role}</div>
                  <div className="text-xs text-concrete/60">{r.company}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest text-concrete/40">Объект</div>
                  <div className="font-display text-base text-gold">{r.area}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}