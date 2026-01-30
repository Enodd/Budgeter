import {useEffect, useState} from "react"
import { BudgetDto, BudgetRequest, BudgetUpdateRequest } from "../lib/Budget";
import axiosInstance from '../services/axiosService';
import { Envs } from "../lib/envs";

export const useBudgets = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [budgets, setBudgets] = useState<BudgetDto[]>([]);

  const fetchBudgets = async (id?: number) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get<BudgetDto[]>(Envs.apiUrl + '/budgets' + (id ? `?id=${id}` : ''));
      setBudgets(data);
      setLoading(false);
      return data;
    } catch (ex) {
      console.log(ex)
      setBudgets([]);
    } finally {
      setLoading(false);
    }
  }

  const updateBudget = async (requestBody: BudgetUpdateRequest) => {
    try {
      setLoading(true);
      const { data, status} = await axiosInstance.put<BudgetDto>(Envs.apiUrl + '/budgets', {
        ...requestBody
      });

      if ([200, 201].includes(status)) {
        const budgetsClone = budgets;
        const idx = budgetsClone.findIndex(budget => budget.id === data.id)
        budgetsClone[idx] = data;
        setBudgets(budgetsClone);
      }
    } catch(ex) {
      console.log(ex)
    } finally {
      setLoading(false);
    }
  }

  const createBudget = async (requestBody: BudgetRequest) => {
    try {
      setLoading(true);
      const { data, status} = await axiosInstance.post<BudgetDto>(Envs.apiUrl + '/budgets', {
        ...requestBody
      });

      if ([200, 201].includes(status)) {
        const budgetsClone = budgets;
        budgetsClone.push(data)
        setBudgets(budgetsClone);
      }
    } catch(ex) {
      console.log(ex)
    } finally {
      setLoading(false);
    }
  }

  const deleteBudget = async (budgetId: number) => {
    try {
      setLoading(true);
      const { status } = await axiosInstance.post(Envs.apiUrl + '/budgets', {
        id: budgetId
      });

      if ([200, 201].includes(status)) {
        const budgetsClone = budgets.filter(b => b.id !== budgetId);
        setBudgets(budgetsClone)
      }
    } catch(ex) {
      console.log(ex)
    } finally {
      setLoading(false);
    }
  }
  
  const refresh = async () => {
    await fetchBudgets()
  }
  
  useEffect(() => {
    refresh()
  }, []);

  return { fetchBudgets, updateBudget, createBudget, deleteBudget, budgets, loading, refresh }
}