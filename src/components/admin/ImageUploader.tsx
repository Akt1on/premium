import { useRef, useState } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
  value?: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  label?: string;
  aspect?: "video" | "square" | "wide" | "portrait";
  maxMb?: number;
}

const ASPECTS = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  portrait: "aspect-[3/4]",
};

export function ImageUploader({
  value,
  onChange,
  folder = "misc",
  label,
  aspect = "video",
  maxMb = 8,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  async function upload(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Только изображения (JPG, PNG, WEBP)");
      return;
    }
    if (file.size > maxMb * 1024 * 1024) {
      toast.error(`Размер не больше ${maxMb} МБ`);
      return;
    }
    setBusy(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("site-images").upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("site-images").getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success("Изображение загружено");
    } catch (e: any) {
      toast.error(e?.message ?? "Ошибка загрузки");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!value) return;
    const m = value.match(/site-images\/(.+)$/);
    if (m && m[1]) {
      await supabase.storage.from("site-images").remove([m[1]]).catch(() => {});
    }
    onChange(null);
  }

  return (
    <div>
      {label && (
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          {label}
        </div>
      )}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files[0];
          if (f) upload(f);
        }}
        className={`relative ${ASPECTS[aspect]} border-2 border-dashed transition-colors overflow-hidden bg-asphalt ${
          dragOver ? "border-[var(--orange)] bg-[var(--orange)]/5" : "border-white/15 hover:border-white/30"
        }`}
      >
        {value ? (
          <>
            <img src={value} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/60 transition-colors grid place-items-center opacity-0 hover:opacity-100">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  disabled={busy}
                  className="px-4 h-10 bg-[var(--orange)] text-asphalt text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" /> Заменить
                </button>
                <button
                  type="button"
                  onClick={remove}
                  disabled={busy}
                  className="w-10 h-10 grid place-items-center bg-destructive text-destructive-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="absolute inset-0 grid place-items-center text-muted-foreground hover:text-[var(--orange)] transition-colors"
          >
            <div className="text-center">
              {busy ? (
                <Loader2 className="w-8 h-8 mx-auto animate-spin" />
              ) : (
                <ImageIcon className="w-8 h-8 mx-auto" />
              )}
              <div className="text-xs uppercase tracking-widest mt-3">
                {busy ? "Загрузка..." : "Перетащите или нажмите"}
              </div>
              <div className="text-[10px] text-muted-foreground/60 mt-1">JPG · PNG · WEBP до {maxMb} МБ</div>
            </div>
          </button>
        )}
        {busy && value && (
          <div className="absolute inset-0 bg-black/60 grid place-items-center">
            <Loader2 className="w-6 h-6 animate-spin text-[var(--orange)]" />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
