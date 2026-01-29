import { BigDecimal } from "./additionalTypes/BigDecimal";

export interface BudgetCategoryDto {
  id?: number | null;
  name?: string | null;
  plannedAmount?: BigDecimal | null;
  spentAmount?: BigDecimal | null;
  limitAmount?: BigDecimal | null;
  color?: string | null;
}

export interface BudgetCategoryRequest {
  name?: string | null;
  plannedAmount?: BigDecimal | null;
  spentAmount?: BigDecimal | null;
  limitAmount?: BigDecimal | null;
  color?: string | null;
}
