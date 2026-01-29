import { useEffect, useState } from "react"
import axiosInstance from '../services/axiosService';
import { Envs } from "../lib/envs";
import { useTranslation } from "react-i18next";
import { FinancialGoalDto } from "../lib/FinancialGoal";

export const useFinancialGoals = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [financialGoals, setFinancialGoals] = useState<FinancialGoalDto[]>([]);
  const [error, setError] = useState<string>();

  const fetchGoals = async () => {
    try {
      setError(undefined);
      setLoading(true);
      const { data } = await axiosInstance.get<FinancialGoalDto[]>(Envs.apiUrl + '/financial_goals');
      setFinancialGoals(data);
      setLoading(false);
    } catch (ex) {
      console.error(ex)
      setError(t('fetch.error', { message: ex }))
      setFinancialGoals([]);
    }
  }
  
  const updateFinancialGoal = async (requestBody: FinancialGoalDto) => {
    try {
      setLoading(true);
      const { data, status} = await axiosInstance.put<FinancialGoalDto>(Envs.apiUrl + '/financial_goals', {
        ...requestBody
      });
      
      if ([200, 201].includes(status)) {
        const categoriesClone = financialGoals;
        const idx = categoriesClone.findIndex(category => category.id === data.id)
        categoriesClone[idx] = data;
        setFinancialGoals(categoriesClone);
      }
    } catch(ex) {
      console.log(ex)
    } finally {
      setLoading(false);
    }
  }
  
  const createFinancialGoal = async (requestBody: FinancialGoalDto) => {
    try {
      setLoading(true);
      const { data, status} = await axiosInstance.post<FinancialGoalDto>(Envs.apiUrl + '/financial_goals', {
        ...requestBody
      });
      
      if ([200, 201].includes(status)) {
        const categoriesClone = financialGoals;
        categoriesClone.push(data)
        setFinancialGoals(categoriesClone);
      }
    } catch(ex) {
      console.log(ex)
    } finally {
      setLoading(false);
    }
  }
  
  const deleteFinancialGoal = async (financialGoalId: number) => {
    try {
      setLoading(true);
      const { status } = await axiosInstance.post(Envs.apiUrl + '/financial_goals', {
        id: financialGoalId
      });
      
      if ([200, 201].includes(status)) {
        const categoriesClone = financialGoals.filter(fg => fg.id !== financialGoalId);
        setFinancialGoals(categoriesClone)
      }
    } catch(ex) {
      console.log(ex)
    } finally {
      setLoading(false);
    }
  }
  
  
  const refresh = async () => {
    await fetchGoals();
  }

  useEffect(() => {
    refresh();
  }, [])

  return { fetchGoals, updateFinancialGoal, createFinancialGoal, deleteFinancialGoal, financialGoals, error, loading, refresh }
}