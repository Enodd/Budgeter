import { TextField, Button, Stack } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { BudgetDto } from "../lib/Budget";

interface Props {
  initialData?: BudgetDto;
  create: (data: BudgetDto) => Promise<void>;
  update: (id: number, data: BudgetDto) => Promise<void>;
}

export function BudgetForm({ initialData, create, update }: Props) {
  const [form, setForm] = useState<BudgetDto>({
    name: initialData?.name ?? "",
    periodStart: initialData?.periodStart ?? "",
    periodEnd: initialData?.periodEnd ?? "",
    totalLimit: initialData?.totalLimit ?? "",
  });

  const handleChange =
    (field: keyof BudgetDto) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    initialData?.id
      ? await update(initialData.id, form)
      : await create(form);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <TextField label={t("budget.name")} value={form.name} onChange={handleChange("name")} />
      <TextField
        label={t("budget.periodStart")}
        type="date"
        InputLabelProps={{ shrink: true }}
        value={form.periodStart}
        onChange={handleChange("periodStart")}
      />
      <TextField
        label={t("budget.periodEnd")}
        type="date"
        InputLabelProps={{ shrink: true }}
        value={form.periodEnd}
        onChange={handleChange("periodEnd")}
      />
      <TextField
        label={t("budget.totalLimit")}
        type="number"
        value={form.totalLimit}
        onChange={handleChange("totalLimit")}
        helperText={t("common.optional")}
      />
      <Button type="submit" variant="contained">
        {initialData ? t("common.saveChanges") : t("budget.add")}
      </Button>
    </Stack>
  );
}
