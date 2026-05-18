import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export const FAQ_ITEMS = [
  { q: "Сколько стоит асфальтирование 1 м²?", a: "Базовая укладка асфальта — от 850 ₽/м² при площади от 500 м². Цена зависит от толщины слоя, типа основания, объёма и удалённости объекта. Точную смету инженер составит после выезда — выезд бесплатный." },
  { q: "Как быстро приедет инженер на объект?", a: "По Москве и ближайшему МО — в течение 2 часов после заявки в рабочее время. По области — в день обращения или на следующий день в удобное вам время." },
  { q: "Работаете ли вы зимой и ночью?", a: "Да. Используем горячий асфальт с термоконтейнерами, выполняем работы при температуре до −20°C. Ночные смены — стандартная практика для объектов, где днём нельзя останавливать движение." },
  { q: "Какая гарантия на выполненные работы?", a: "На асфальтобетонное покрытие — 3 года в письменном виде по договору. На благоустройство, плитку и бордюры — 2 года. Гарантийные случаи устраняем за наш счёт." },
  { q: "Заключаете ли вы официальный договор?", a: "Только так. Работаем по договору с любыми формами оплаты — нал, безнал, НДС/без НДС. Предоставляем полный пакет закрывающих документов: акты КС-2, КС-3, счёт-фактуру." },
  { q: "Используете ли субподрядчиков?", a: "Нет. У нас собственный парк техники — асфальтоукладчики, катки, самосвалы, фрезы — и постоянная бригада. Это позволяет держать качество и сроки." },
  { q: "За какой минимальный срок реализуете объект?", a: "Стандартный объект до 2000 м² можем закрыть «под ключ» за 72 часа: подготовка основания, укладка, уплотнение, разметка. Сложные объекты — по графику с поэтапной сдачей." },
  { q: "Можно ли заказать только доставку материалов?", a: "Да. Поставляем горячий асфальт, щебень, песок, ПГС со своих карьеров и баз. Доставка самосвалами 10–25 тонн по Москве и МО, в любое время." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-graphite py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-15 pointer-events-none" />
      <div className="relative mx-auto max-w-[1300px] px-6 lg:px-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <span className="text-xs uppercase tracking-[0.4em] text-gold">Вопросы и ответы</span>
        </div>
        <h2 className="font-display leading-[0.9] tracking-tight max-w-4xl mb-12"
            style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}>
          ЧАСТЫЕ <span className="text-gold">ВОПРОСЫ</span>
        </h2>

        <div className="border-t border-white/10">
          {FAQ_ITEMS.map((it, i) => {
            const active = open === i;
            return (
              <div key={it.q} className="border-b border-white/10">
                <button
                  onClick={() => setOpen(active ? null : i)}
                  className="w-full text-left py-6 md:py-7 flex items-start gap-6 group"
                >
                  <span className="font-display text-sm text-gold tabular-nums shrink-0 mt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg sm:text-xl md:text-2xl leading-tight flex-1 group-hover:text-gold transition-colors">
                    {it.q}
                  </span>
                  <Plus className={`w-5 h-5 mt-1.5 shrink-0 text-gold transition-transform duration-500 ${active ? "rotate-45" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pl-12 pr-12 text-base leading-relaxed text-concrete/80 max-w-3xl">
                        {it.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}