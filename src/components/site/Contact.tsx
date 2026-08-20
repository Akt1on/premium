import { motion } from "framer-motion";
import { Phone, Send, MessageCircle } from "lucide-react";
import { useSettings } from "@/lib/use-settings";

export function Contact() {
  const { data: s } = useSettings();
  const phone = s?.phone ?? "+7 (915) 156-30-06";
  const tel = phone.replace(/[^+\d]/g, "");
  const tg = (s?.telegram ?? "premiumstroe").replace(/^@/, "");
  const wa = (s?.whatsapp ?? tel).replace(/[^+\d]/g, "");
  const maxUser = (s?.max_messenger ?? "").replace(/^@/, "");

  const channels = [
    {
      label: "Позвонить",
      sub: "Ответ ~3 мин · 24/7",
      href: `tel:${tel}`,
      icon: Phone,
      accent: true,
    },
    {
      label: "Telegram",
      sub: `@${tg}`,
      href: `https://t.me/${tg}`,
      icon: Send,
      accent: false,
      external: true,
    },
    {
      label: "WhatsApp",
      sub: "Написать в чат",
      href: `https://wa.me/${wa.replace("+", "")}`,
      icon: MessageCircle,
      accent: false,
      external: true,
    },
    {
      label: "VK Max",
      sub: maxUser ? `@${maxUser}` : "Написать",
      href: maxUser ? `https://vk.me/${maxUser}` : "https://vk.com/im",
      icon: MessageCircle,
      accent: false,
      external: true,
    },
  ];

  return (
    <section id="contact" className="relative bg-asphalt py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none"></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "var(--gradient-radial-orange)" }}
      ></div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--orange)] animate-pulse"></span>
            <span className="text-xs uppercase tracking-[0.4em] text-[var(--orange)]">Готовы начать</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display text-[10vw] sm:text-[8vw] md:text-[7vw] leading-[0.9]"
          >
            ОБСУДИМ <br />
            <span className="text-[var(--orange)]">ВАШ ПРОЕКТ.</span>
          </motion.h2>
          <p className="mt-6 text-base sm:text-lg text-concrete px-2">
            Свяжитесь с нами удобным способом — инженер ответит в течение 30 минут и подготовит расчёт.
          </p>
        </div>

        {/* Channel cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 max-w-5xl mx-auto">
          {channels.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.label}
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className={`group flex flex-col items-center justify-center gap-4 py-12 px-8 transition-colors text-center ${
                  c.accent
                    ? "bg-[var(--orange)] text-asphalt hover:bg-[var(--orange-glow)]"
                    : "bg-graphite hover:bg-asphalt"
                }`}
                aria-label={c.label}
              >
                <div
                  className={`w-14 h-14 grid place-items-center border transition-colors ${
                    c.accent
                      ? "border-asphalt/30"
                      : "border-white/15 group-hover:border-[var(--orange)]"
                  }`}
                >
                  <Icon className="w-6 h-6" strokeWidth={1.6} />
                </div>
                <div>
                  <div
                    className={`font-display text-xl tracking-wide ${
                      c.accent ? "" : "group-hover:text-[var(--orange)] transition-colors"
                    }`}
                  >
                    {c.label}
                  </div>
                  <div
                    className={`text-xs uppercase tracking-widest mt-1 ${
                      c.accent ? "opacity-70" : "text-muted-foreground"
                    }`}
                  >
                    {c.sub}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Info row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 max-w-5xl mx-auto mt-px">
          {[
            { l: "Телефон", v: phone, h: `tel:${tel}` },
            { l: "Email", v: s?.email ?? "sardaryan.ayk@mail.ru", h: `mailto:${s?.email ?? ""}` },
            { l: "Адрес", v: s?.address ?? "г. Красногорск, МО", h: undefined },
            { l: "Режим работы", v: s?.working_hours ?? "24 / 7 — без выходных", h: undefined },
          ].map((c) => (
            <a
              key={c.l}
              href={c.h}
              className="block bg-graphite p-6 hover:bg-asphalt transition-colors group"
            >
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.l}</div>
              <div className="font-display text-lg mt-2 group-hover:text-[var(--orange)] transition-colors">
                {c.v}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
