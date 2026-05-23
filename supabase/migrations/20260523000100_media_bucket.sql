insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('izuba-media', 'izuba-media', true, 104857600, array['video/mp4'])
on conflict (id) do update
set
  public = true,
  file_size_limit = 104857600,
  allowed_mime_types = array['video/mp4'];
