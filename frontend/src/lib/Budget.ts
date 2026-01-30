import { BigDecimal } from "./additionalTypes/BigDecimal";
import { Transaction } from "./Transaction";

export interface BudgetDto {
  id?: number | null;
  name?: string | null;
  periodStart?: string | null;
  periodEnd?: string | null;
  totalLimit?: BigDecimal | null;
  transactions?: Transaction[] | null;
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