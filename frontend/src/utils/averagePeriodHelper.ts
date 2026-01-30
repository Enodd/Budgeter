type Period = "month" | "year";

export function averageByPeriod<T>(
  data: T[],
  dateSelector: (item: T) => string | undefined | null,
  valueSelector: (item: T) => number,
  period: Period
) {
  const map = new Map<string, { sum: number; count: number }>();

  data.forEach(item => {
    const date = dateSelector(item);
    if (!date) return;

    const key =
      period === "month"
        ? date.slice(0, 7)
        : date.slice(0, 4);

    const entry = map.get(key) ?? { sum: 0, count: 0 };
    entry.sum += valueSelector(item);
    entry.count += 1;
    map.set(key, entry);
  });

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, { sum, count }]) => ({
      label,
      value: Number((sum / count).toFixed(2)),
    }));
}
