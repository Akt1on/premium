-- Storage bucket for site images
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

-- RLS policies for site-images bucket
create policy "Public can view site images"
on storage.objects for select
to public
using (bucket_id = 'site-images');

create policy "Admins can upload site images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can update site images"
on storage.objects for update
to authenticated
using (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete site images"
on storage.objects for delete
to authenticated
using (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));

-- Seed media keys in site_settings
insert into public.site_settings (key, value) values
  ('hero_image', ''),
  ('hero_video_poster', ''),
  ('about_image_1', ''),
  ('about_image_2', ''),
  ('materials_image', ''),
  ('machinery_image_1', ''),
  ('machinery_image_2', ''),
  ('machinery_image_3', ''),
  ('process_image', ''),
  ('compare_before', ''),
  ('compare_after', ''),
  ('footer_logo', ''),
  ('og_image', '')
on conflict (key) do nothing;