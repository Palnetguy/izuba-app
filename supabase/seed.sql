insert into public.farms (id, name, district, lead_farmer_name, female_farmer_count, active_tubes)
values
  ('00000000-0000-0000-0000-000000000101', 'Nyamata Women Growers', 'Bugesera', 'Aline Mukamana', 38, 520),
  ('00000000-0000-0000-0000-000000000102', 'Huye Sunrise Cooperative', 'Huye', 'Clarisse Uwase', 31, 430),
  ('00000000-0000-0000-0000-000000000103', 'Musanze Mycelium Hub', 'Musanze', 'Vestine Iradukunda', 27, 470);

insert into public.restaurants (id, name, district, contact_name, delivery_address)
values
  ('00000000-0000-0000-0000-000000000201', 'Kigali Table', 'CBD', 'Chef Nadia', 'KN 4 Avenue, Kigali'),
  ('00000000-0000-0000-0000-000000000202', 'Umami Kacyiru', 'Kacyiru', 'Chef Emmanuel', 'KG 7 Avenue, Kigali'),
  ('00000000-0000-0000-0000-000000000203', 'Norrsken Cafe', 'Nyarutarama', 'Procurement Desk', 'Norrsken House Kigali');

insert into public.harvest_batches (
  id, farm_id, mushroom_type, available_kg, reserved_kg, harvest_date,
  price_per_kg, quality_score, eta_hours, substrate_kg, qr_slug
)
values
  ('00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000101', 'Oyster mushrooms', 86, 54, '2026-05-23', 2800, 97, 12, 128, 'nyamata-oyster-2401'),
  ('00000000-0000-0000-0000-000000000302', '00000000-0000-0000-0000-000000000102', 'Button mushrooms', 62, 48, '2026-05-23', 3200, 94, 16, 92, 'huye-button-2402'),
  ('00000000-0000-0000-0000-000000000303', '00000000-0000-0000-0000-000000000103', 'Shiitake trial crop', 39, 24, '2026-05-24', 4500, 91, 34, 64, 'musanze-shiitake-2403');

insert into public.farm_rooms (farm_id, room_code, stage, tubes, humidity, temp_c, ready_in_days)
values
  ('00000000-0000-0000-0000-000000000101', 'ROOM-A', 'Fruiting', 520, 88, 21, 1),
  ('00000000-0000-0000-0000-000000000102', 'ROOM-B', 'Pinning', 430, 84, 22, 2),
  ('00000000-0000-0000-0000-000000000103', 'ROOM-C', 'Incubation', 470, 79, 20, 5);

insert into public.demand_signals (restaurant_id, forecast_kg, match_rate, priority)
values
  ('00000000-0000-0000-0000-000000000201', 32, 96, 'High'),
  ('00000000-0000-0000-0000-000000000202', 24, 89, 'High'),
  ('00000000-0000-0000-0000-000000000203', 18, 82, 'Medium');
