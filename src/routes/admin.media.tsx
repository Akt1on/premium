import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { toast } from "sonner";

type Row = { key: string; value: string | null };

const MEDIA_GROUPS: { title: string; slots: { key: string; label: string; aspect?: "video" | "square" | "wide" | "portrait"; folder?: string }[] }[] = [
  {
    title: "Главная — Hero",
    slots: [
      { key: "hero_image", label: "Фоновое изображение Hero", aspect: "wide", folder: "hero" },
    ],
  },
  {
    title: "О компании",
    slots: [
      { key: "about_image_1", label: "О компании — фото 1", aspect: "video", folder: "about" },
      { key: "about_image_2", label: "О компании — фото 2", aspect: "video", folder: "about" },
    ],
  },
  {
    title: "Материалы",
    slots: [
      { key: "materials_image", label: "Фон секции «Материалы»", aspect: "wide", folder: "materials" },
    ],
  },
  {
    title: "Парк техники",
    slots: [
      { key: "machinery_image_1", label: "Самосвалы", aspect: "video", folder: "machinery" },
      { key: "machinery_image_2", label: "Экскаватор-погрузчик", aspect: "video", folder: "machinery" },
      { key: "machinery_image_3", label: "Асфальтоукладчик", aspect: "video", folder: "machinery" },
    ],
  },
  {
    title: "Сравнение «до/после»",
    slots: [
      { key: "compare_before", label: "До (старое покрытие)", aspect: "video", folder: "compare" },
      { key: "compare_after", label: "После (новое покрытие)", aspect: "video", folder: "compare" },
    ],
  },
  {
    title: "Процесс работы",
    slots: [
      { key: "process_image", label: "Фон секции «Процесс»", aspect: "wide", folder: "process" },
    ],
  },
  {
    title: "Бренд",
    slots: [
      { key: "footer_logo", label: "Логотип в подвале", aspect: "square", folder: "brand" },
      { key: "og_image", label: "OG-картинка (соцсети)", aspect: "wide", folder: "brand" },
    ],
  },
];

export const Route = createFileRoute("/admin/media")({
  component: MediaAdmin,
});

function MediaAdmin() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin_media"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key,value");
      if (error) throw error;
      return data as Row[];
    },
  });

  const save = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string | null }) => {
      const { error } = await supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin_media"] });
      qc.invalidateQueries({ queryKey: ["site_settings"] });
      toast.success("Сохранено");
    },
    onError: (e: any) => toast.error(e?.message ?? "Ошибка"),
  });

  const map: Record<string, string> = {};
  (data ?? []).forEach((r) => { map[r.key] = r.value ?? ""; });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl">Медиа</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Все изображения сайта. Если слот пустой — на сайте будет использоваться стандартная картинка.
        </p>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Загрузка...</div>
      ) : (
        <div className="space-y-10">
          {MEDIA_GROUPS.map((g) => (
            <section key={g.title} className="bg-graphite border border-white/10 p-6 sm:p-8">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--orange)] mb-5">{g.title}</div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {g.slots.map((s) => (
                  <ImageUploader
                    key={s.key}
                    value={map[s.key] || null}
                    onChange={(url) => save.mutate({ key: s.key, value: url })}
                    label={s.label}
                    aspect={s.aspect ?? "video"}
                    folder={s.folder ?? "misc"}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
