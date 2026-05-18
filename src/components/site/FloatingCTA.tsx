import { useEffect, useState } from "react";
import { Phone, Send, MessageCircle } from "lucide-react";
import { useSettings } from "@/lib/use-settings";

export function FloatingCTA() {
  const { data: s } = useSettings();
  const phone = s?.phone ?? "+7 (800) 000-00-00";
  const tel = phone.replace(/[^+\d]/g, "");
  const tg = (s?.telegram ?? "premiumstroe").replace(/^@/, "");
  const wa = (s?.whatsapp ?? tel).replace(/[^+\d]/g, "").replace("+", "");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed z-40 right-4 bottom-4 sm:right-6 sm:bottom-6 flex flex-col gap-3 transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <a
        href={`https://wa.me/${wa}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 grid place-items-center bg-graphite border border-[var(--orange)] text-gold hover:bg-[var(--orange)] hover:text-asphalt transition-colors"
      >
        <MessageCircle className="w-5 h-5" strokeWidth={1.6} />
      </a>
      <a
        href={`https://t.me/${tg}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в Telegram"
        className="w-13 h-13 sm:w-14 sm:h-14 grid place-items-center bg-graphite border border-[var(--orange)] text-gold hover:bg-[var(--orange)] hover:text-asphalt transition-colors"
      >
        <Send className="w-5 h-5" strokeWidth={1.6} />
      </a>
      <a
        href={`tel:${tel}`}
        aria-label="Позвонить"
        className="relative w-13 h-13 sm:w-14 sm:h-14 grid place-items-center bg-gold text-asphalt animate-soft-pulse"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
