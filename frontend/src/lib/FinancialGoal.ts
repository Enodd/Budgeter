import { BigDecimal } from "./additionalTypes/BigDecimal";

export interface FinancialGoalDto {
  id?: number | null;
  userId?: number | null;
  name?: string | null;
  targetAmount?: BigDecimal | null;
  currentAmount?: BigDecimal | null;
  deadline?: string | null;
  priority?: number | null;
}