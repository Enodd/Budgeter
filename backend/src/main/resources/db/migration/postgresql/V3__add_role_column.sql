alter table public.users
add constraint email_unique UNIQUE (mail);

alter table public.users
add column role varchar(20) not null default 'USER';

alter table public.users
add constraint check_role check (role in ('USER', 'ADMIN'));