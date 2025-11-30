alter table public.users
add refreshToken text;

alter table public.users
    add constraint refresh_unique unique (refreshToken);

alter table public.users
add refreshTokenExpiryDate TIMESTAMP WITHOUT TIME ZONE;

