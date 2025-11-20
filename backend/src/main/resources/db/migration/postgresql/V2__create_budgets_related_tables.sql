create table public.budgets
(
    id           integer primary key,
    name         varchar(40) not null,
    period_start DATE        not null,
    period_end   date        not null,
    total_limit  DECIMAL(12, 2),
    id_user      integer references public.users (id)
);

create table public.budget_categories
(
    id             integer primary key,
    budget_id      integer references public.budgets (id),
    name           varchar(40) not null,
    planned_amount decimal(12, 2),
    spent_amount   decimal(12, 2) default 0,
    limit_amount   decimal(12, 2),
    color          varchar(7)
);

create table public.transactions
(
    id                 integer primary key,
    budget_category_id integer references public.budget_categories (id),
    amount             decimal(12, 2) not null,
    description        text,
    transaction_date   date           not null,
    type               varchar(20)    not null check (type in ('INCOME', 'EXPENSE'))
);

create table public.financial_goals
(
    id             integer primary key,
    user_id        integer references public.users (id),
    name           varchar(255) not null,
    target_amount  decimal(12, 2),
    current_amount decimal(12, 2) default 0,
    deadline       date,
    priority       integer
);

create table public.recurring_transactions
(
    id                 int primary key,
    budget_category_id integer references public.budget_categories (id),
    amount             decimal(12, 2) not null,
    frequency          varchar(20)    not null check (frequency in ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY')),
    next_occurrence    date,
    description        text
);