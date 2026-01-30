import { TextField, Button, Stack } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { FinancialGoalDto } from "../lib/FinancialGoal";

interface Props {
  initialData?: FinancialGoalDto;
  create: (data: FinancialGoalDto) => Promise<void>;
  update: (id: number, data: FinancialGoalDto) => Promise<void>;
}

export function FinancialGoalForm({ initialData, create, update }: Props) {
  const [form, setForm] = useState<FinancialGoalDto>({
    name: initialData?.name ?? "",
    targetAmount: initialData?.targetAmount ?? "",
    currentAmount: initialData?.currentAmount ?? "",
    deadline: initialData?.deadline ?? "",
    priority: initialData?.priority ?? 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    initialData?.id
      ? await update(initialData.id, form)
      : await create(form);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <TextField label={t("financialGoal.name")} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <TextField label={t("financialGoal.targetAmount")} type="number" value={form.targetAmount} onChange={e => setForm({ ...form, targetAmount: e.target.value })} />
      <TextField label={t("financialGoal.currentAmount")} type="number" value={form.currentAmount} onChange={e => setForm({ ...form, currentAmount: e.target.value })} />
      <TextField
        label={t("financialGoal.deadline")}
        type="date"
        InputLabelProps={{ shrink: true }}
        value={form.deadline}
        onChange={e => setForm({ ...form, deadline: e.target.value })}
      />
      <TextField
        label={t("financialGoal.priority")}
        type="number"
        value={form.priority}
        onChange={e => setForm({ ...form, priority: Number(e.target.value) })}
        helperText={t("common.optional")}
      />
      <Button type="submit" variant="contained">
        {initialData ? t("common.saveChanges") : t("financialGoal.add")}
      </Button>
    </Stack>
  );
}
