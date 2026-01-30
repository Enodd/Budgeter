import { TextField, Button, Stack, MenuItem } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { BudgetCategoryDto } from "../lib/Category";
import { Transaction } from "../lib/Transaction";

interface Props {
  categories: BudgetCategoryDto[];
  initialData?: Transaction;
  create: (data: Transaction) => Promise<void>;
  update: (id: number, data: Transaction) => Promise<void>;
}

export function TransactionForm({ categories, initialData, create, update }: Props) {
  const [form, setForm] = useState<Transaction>({
    amount: initialData?.amount ?? "",
    description: initialData?.description ?? "",
    transactionDate: initialData?.transactionDate ?? "",
    type: initialData?.type ?? "EXPENSE",
    budgetCategory: initialData?.budgetCategory ?? null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    initialData?.id
      ? await update(initialData.id, form)
      : await create(form);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <TextField label={t("transaction.amount")} type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
      <TextField label={t("transaction.description")} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <TextField
        label={t("transaction.date")}
        type="date"
        value={form.transactionDate}
        onChange={e => setForm({ ...form, transactionDate: e.target.value })}
      />

      <TextField select label={t("transaction.type")} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
        <MenuItem value="INCOME">{t("transaction.type.income")}</MenuItem>
        <MenuItem value="EXPENSE">{t("transaction.type.expense")}</MenuItem>
      </TextField>

      <TextField
        select
        label={t("transaction.category")}
        value={form.budgetCategory?.id ?? ""}
        onChange={e =>
          setForm({
            ...form,
            budgetCategory: categories.find(c => c.id === Number(e.target.value)) ?? null,
          })
        }
      >
        {categories.map(cat => (
          <MenuItem key={cat.id} value={`${cat.id}`}>
              {`${cat.name}`}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" variant="contained">
        {initialData ? t("common.saveChanges") : t("transaction.add")}
      </Button>
    </Stack>
  );
}
