import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useMatches,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { FAQ_ITEMS } from "@/components/site/FAQ";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-[var(--orange)]">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Страница не найдена</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center px-5 h-11 bg-[var(--orange)] text-asphalt text-sm font-semibold uppercase tracking-wider">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Что-то пошло не так</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex items-center justify-center px-5 h-11 bg-[var(--orange)] text-asphalt text-sm font-semibold uppercase tracking-wider"
        >
          Повторить
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function JsonLd() {
  return (
    <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://premiumstroe.ru/#org",
                  name: "ООО «Премиум Строй»",
                  url: "https://premiumstroe.ru",
                  telephone: "+7 (915) 156-30-06",
                  email: "sardaryan.ayk@mail.ru",
                  priceRange: "₽₽",
                  image: "https://premiumstro.lovable.app/og.jpg",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Красногорск",
                    addressRegion: "Московская область",
                    addressCountry: "RU",
                  },
                  geo: { "@type": "GeoCoordinates", latitude: 55.8317, longitude: 37.3296 },
                  openingHoursSpecification: [{
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                    opens: "00:00", closes: "23:59",
                  }],
                  areaServed: ["Красногорск", "Москва", "Московская область", "Химки", "Одинцово", "Истра"],
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "127",
                  },
                  sameAs: ["https://t.me/premiumstroe"],
                },
                {
                  "@type": "FAQPage",
                  mainEntity: FAQ_ITEMS.map((it) => ({
                    "@type": "Question",
                    name: it.q,
                    acceptedAnswer: { "@type": "Answer", text: it.a },
                  })),
                },
              ],
            }),
          }}
    />
  );
}

function HeadApplier() {
  const matches = useMatches();
  const router = useRouter();
  useEffect(() => {
    const created: HTMLElement[] = [];
    let title: string | undefined;
    const seen = new Set<string>();
    for (const m of matches) {
      const route: any = (router as any).routesById?.[m.routeId];
      const headFn = route?.options?.head;
      if (typeof headFn !== "function") continue;
      let result: any;
      try { result = headFn({ loaderData: (m as any).loaderData, params: (m as any).params, match: m }); } catch { continue; }
      for (const meta of result?.meta || []) {
        if (meta.title) { title = meta.title; continue; }
        if (meta.charSet) continue;
        const key = meta.name || meta.property;
        if (!key || seen.has(key)) continue;
        seen.add(key);
        const el = document.createElement("meta");
        if (meta.name) el.setAttribute("name", meta.name);
        if (meta.property) el.setAttribute("property", meta.property);
        if (meta.content) el.setAttribute("content", meta.content);
        el.setAttribute("data-head-applier", "1");
        document.head.appendChild(el);
        created.push(el);
      }
    }
    if (title) document.title = title;
    return () => { created.forEach((e) => e.remove()); };
  }, [matches, router]);
  return null;
}

function RootComponent() {
  return (
    <>
      <HeadApplier />
      <JsonLd />
      <Outlet />
    </>
  );
}
