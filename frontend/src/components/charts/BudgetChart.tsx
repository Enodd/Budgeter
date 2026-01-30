import { BarChart } from "@mui/x-charts";
import { BudgetDto } from "../../lib/Budget";
import { averageByPeriod } from "../../utils/averagePeriodHelper";
import { useTranslation } from "react-i18next";

interface Props {
  data: BudgetDto[];
  period: "month" | "year";
}

export function BudgetChart({ data, period }: Props) {
  const { t } = useTranslation();
  const chartData = averageByPeriod(
    data,
    (b: BudgetDto) => b.periodStart,
    (b: BudgetDto) => Number(b.totalLimit ?? 0),
    period
  );

  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: chartData.map(d => d.label) }]}
      series={[{ data: chartData.map(d => d.value), label: t('chart.budget.average') }]}
      height={300}
    />
  );
}
