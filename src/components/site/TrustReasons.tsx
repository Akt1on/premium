import { motion } from "framer-motion";
import { Truck, ShieldCheck, Clock, Snowflake, FileText, Activity } from "lucide-react";

const REASONS = [
  { icon: Truck, title: "Собственный парк техники", text: "Асфальтоукладчики, катки, самосвалы, фрезы. Без субподряда — без перекладывания ответственности." },
  { icon: ShieldCheck, title: "Гарантия 3 года", text: "Письменно в договоре. Гарантийные случаи устраняем бесплатно в течение 5 рабочих дней." },
  { icon: Clock, title: "Инженер за 2 часа", text: "По Москве и ближнему МО приедем замерить объект и подготовить смету в день обращения." },
  { icon: Snowflake, title: "Работаем ночью и зимой", text: "Сменный график 24/7, горячий асфальт в термоконтейнерах. Укладка при температуре до −20°C." },
  { icon: FileText, title: "Полный пакет документов", text: "Договор, КС-2, КС-3, счёт-фактура. Работаем с НДС и без, наличный и безналичный расчёт." },
  { icon: Activity, title: "Онлайн-трекинг объекта", text: "Отчёт по этапам, фото-фиксация, ежедневная сводка по WhatsApp/Telegram. Прозрачно от старта до сдачи." },
];

export function TrustReasons() {
  return (
    <section className="relative bg-asphalt py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <span className="text-xs uppercase tracking-[0.4em] text-gold">Почему мы</span>
        </div>
        <h2 className="font-display leading-[0.9] tracking-tight max-w-5xl mb-14"
            style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}>
          6 ПРИЧИН ВЫБРАТЬ <span className="text-gold">«ПРЕМИУМ СТРОЙ»</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                className="bg-asphalt p-8 md:p-10 group hover:bg-graphite transition-colors"
              >
                <div className="w-12 h-12 grid place-items-center border border-[var(--orange)]/40 text-gold group-hover:bg-[var(--orange)] group-hover:text-asphalt transition-colors">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl md:text-2xl mt-6">{r.title}</h3>
                <p className="mt-3 text-sm text-concrete/70 leading-relaxed">{r.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}