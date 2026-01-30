import { BigDecimal } from "./additionalTypes/BigDecimal";
import { BudgetDto } from "./Budget";
import { BudgetCategoryDto } from "./Category";

export interface Transaction {
  id?: number | null;
  budgetCategory?: BudgetCategoryDto | null;
  budget?: BudgetDto | null;
  amount?: BigDecimal | null;
  description?: string | null;
  transactionDate?: string | null;
  type?: string | null;
}

export interface TransactionRequest {
  name?: string | null;
  amount?: BigDecimal | null;
  description?: string | null;
  transactionDate?: string | null;
  type?: string | null;
  budgetCategoryId?: number | null;
}

export interface TransactionUpdateRequest extends TransactionRequest {}