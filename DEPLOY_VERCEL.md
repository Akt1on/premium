# Деплой на Vercel

## Быстрый старт

### 1. Переменные окружения в Vercel
Зайдите в **Project → Settings → Environment Variables** и добавьте:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://ecwfqajcotqtdbkszydb.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGci...` (anon key из .env) |

### 2. Deploy via Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### 3. Deploy via GitHub
- Пуш репозиторий на GitHub
- Подключите репо в vercel.com → New Project
- Vercel автоматически определит Vite — настройки уже в `vercel.json`

## После деплоя

### Создать admin-аккаунт
1. Откройте `https://ваш-домен.vercel.app/admin`
2. Нажмите «Нет аккаунта? Зарегистрироваться»
3. Зарегистрируйтесь через email или логин `admin`
4. В Supabase Dashboard → Table Editor → `user_roles` добавьте строку:
   - `user_id`: ваш UUID (из Authentication → Users)
   - `role`: `admin`

### Настройки мессенджеров (в Adminke → Настройки)
- **telegram**: username без @ (например `premiumstroe`)
- **whatsapp**: номер в формате `+79001234567`
- **max_messenger**: username VK (например `premiumstroe`)

## Структура проекта
- `src/routes/` — страницы (TanStack Router file-based routing)
- `src/components/site/` — публичные компоненты
- `src/components/admin/` — компоненты админки
- `src/integrations/supabase/` — Supabase client и типы
- `supabase/migrations/` — SQL миграции БД
