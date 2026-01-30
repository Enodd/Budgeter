import { TextField, Button, Stack } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { BudgetCategoryDto } from "../lib/Category";

interface Props {
  initialData?: BudgetCategoryDto;
  create: (data: BudgetCategoryDto) => Promise<void>;
  update: (id: number, data: BudgetCategoryDto) => Promise<void>;
}

export function BudgetCategoryForm({ initialData, create, update }: Props) {
  const [form, setForm] = useState<BudgetCategoryDto>({
    name: initialData?.name ?? "",
    plannedAmount: initialData?.plannedAmount ?? "",
    spentAmount: initialData?.spentAmount ?? "",
    limitAmount: initialData?.limitAmount ?? "",
    color: initialData?.color ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    initialData?.id
      ? await update(initialData.id, form)
      : await create(form);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <TextField label={t("budgetCategory.name")} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <TextField label={t("budgetCategory.plannedAmount")} type="number" value={form.plannedAmount} onChange={e => setForm({ ...form, plannedAmount: e.target.value })} />
      <TextField label={t("budgetCategory.spentAmount")} type="number" value={form.spentAmount} onChange={e => setForm({ ...form, spentAmount: e.target.value })} />
      <TextField label={t("budgetCategory.limitAmount")} type="number" value={form.limitAmount} onChange={e => setForm({ ...form, limitAmount: e.target.value })} />
      <TextField
        label={t("budgetCategory.color")}
        value={form.color}
        onChange={e => setForm({ ...form, color: e.target.value })}
        helperText={t("common.optional")}
      />
      <Button type="submit" variant="contained">
        {initialData ? t("common.saveChanges") : t("budgetCategory.add")}
      </Button>
    </Stack>
  );
}

