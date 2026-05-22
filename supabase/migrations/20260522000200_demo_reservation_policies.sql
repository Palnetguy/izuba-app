create policy "demo insert orders" on public.orders
for insert
with check (true);

create policy "demo insert order items" on public.order_items
for insert
with check (true);

create policy "demo update harvest reservations" on public.harvest_batches
for update
using (true)
with check (true);
