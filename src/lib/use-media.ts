import { useSettings } from "@/lib/use-settings";

/**
 * Возвращает URL изображения из site_settings или fallback (статический ассет),
 * если в БД пусто.
 */
export function useMedia(key: string, fallback: string): string {
  const { data } = useSettings();
  const v = data?.[key]?.trim();
  return v && v.length > 0 ? v : fallback;
}
