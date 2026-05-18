## Что будет сделано

### 1. Storage для изображений (Lovable Cloud)
- Создам публичный bucket `site-images` с RLS:
  - Чтение — всем (public)
  - Загрузка/обновление/удаление — только admin (`has_role`)
- Создам переиспользуемый компонент `<ImageUploader>` для админки (drag&drop, preview, прогресс, замена, удаление, генерация публичного URL).

### 2. БД — ключи под все статичные фото
В таблицу `site_settings` добавлю ключи (через миграцию seed):
- `hero_image`, `hero_video_poster`
- `about_image_1`, `about_image_2`
- `materials_image`, `machinery_image_1..3`
- `process_image`, `compare_before`, `compare_after`
- `footer_logo`, `og_image`

`services.image_url` и `projects.image_url` уже есть — подключу загрузку в их формы.

### 3. Админка — раздел «Медиа»
- `/admin/media` — таблица всех «слотов» картинок сайта с превью + кнопкой «Заменить» (через `<ImageUploader>`).
- В `/admin/services` и `/admin/projects` — добавлю загрузчик вместо текстового поля URL.
- В `/admin/settings` — добавлю секцию «Изображения» (hero, about и т.д.).

### 4. Подключение к публичному сайту
Все компоненты (Hero, About, Materials, MachineryShowcase, Process, AsphaltCompare, Services, Projects, Footer) — переведу с `import @/assets/...` на чтение из `useSettings()` / `useServices()` / `useProjects()` с **fallback** на текущие статичные ассеты (если в БД пусто). Никаких пустых картинок на проде.

### 5. Качество сайта (быстрые победы)
- Lazy loading + `decoding="async"` для всех `<img>`
- `loading="eager"` + `fetchpriority="high"` только для hero
- Skeleton-загрузка для секций с данными из БД
- Исправлю найденные мелкие ошибки (если LSP/console что-то покажет)
- Уточню SEO мета (canonical, og:image из settings)

### 6. Деплой на Vercel через GitHub
**Важно понимать:** проект сейчас собирается под Cloudflare Workers (`@cloudflare/vite-plugin`, `wrangler.jsonc`, `src/server.ts`). Чтобы он работал на Vercel «из коробки» без ошибок, я:
- Добавлю `vercel.json` с настройками для TanStack Start
- Добавлю условный target: при сборке на Vercel (`process.env.VERCEL=1`) Vite будет использовать **Node-адаптер** вместо Cloudflare, при сборке в Lovable — останется Cloudflare (чтобы preview в Lovable продолжал работать).
- Добавлю README с инструкцией:
  1. Connect GitHub в Lovable (+ → GitHub → Connect)
  2. На vercel.com → New Project → импорт репозитория
  3. Переменные окружения: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (значения дам в чате — они уже в `.env`)
  4. Framework Preset: **Other**, Build: `npm run build`, Output: `.vercel/output` (TanStack Start auto-detect)
- Проверю, что нет Cloudflare-специфичных API (`caches`, `KV`, и т.д.) — их в проекте нет, используется только fetch + Supabase, поэтому совместимость хорошая.

**Честное предупреждение:** TanStack Start v1 на Vercel поддерживается официально, но это менее обкатанный путь, чем встроенный Publish от Lovable. Если на Vercel будет 500 на серверных функциях — скорее всего из-за ENV. Я в README напишу диагностику.

## Технические детали

**Storage upload (browser):**
```ts
const { data, error } = await supabase.storage
  .from('site-images')
  .upload(`${slot}/${Date.now()}-${file.name}`, file, { upsert: false });
const { data: { publicUrl } } = supabase.storage.from('site-images').getPublicUrl(data.path);
```

**Settings update (admin):**
```ts
await supabase.from('site_settings').upsert({ key: 'hero_image', value: publicUrl });
```

**Fallback в компонентах:**
```ts
const heroImg = settings?.hero_image || heroFallback;
```

## Порядок работ
1. Миграция: bucket + RLS + seed settings ключей
2. `<ImageUploader>` компонент
3. Страница `/admin/media` + обновления `/admin/services`, `/admin/projects`, `/admin/settings`
4. Подключение settings к публичным компонентам с fallback
5. Производительность + lazy + skeletons
6. `vercel.json` + условный vite.config + README с инструкцией деплоя

Готов начинать?
