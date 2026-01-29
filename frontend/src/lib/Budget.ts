import { BigDecimal } from "./additionalTypes/BigDecimal";

export interface BudgetDto {
  id?: number | null;
  name?: string | null;
  periodStart?: string | null;
  periodEnd?: string | null;
  totalLimit?: BigDecimal | null;
}

export interface BudgetRequest {
  name?: string | null;
  periodStart?: string | null;
  periodEnd?: string | null;
  totalLimit?: BigDecimal | null;
}

export interface BudgetUpdateRequest extends BudgetRequest {
  id?: number | null;
}