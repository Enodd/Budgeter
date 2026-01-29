import { useEffect, useState } from "react"
import axiosInstance from '../services/axiosService';
import { Envs } from "../lib/envs";
import { useTranslation } from "react-i18next";
import { BudgetCategoryDto, BudgetCategoryRequest } from "../lib/Category";

export const useCategories = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<BudgetCategoryDto[]>([]);
  const [error, setError] = useState<string>();

  const fetchCategories = async () => {
    try {
      setError(undefined);
      setLoading(true);
      const { data } = await axiosInstance.get<BudgetCategoryDto[]>(Envs.apiUrl + '/budgets/category');
      setCategories(data);
      setLoading(false);
    } catch (ex) {
      console.error(ex)
      setError(t('fetch.error', { message: ex }))
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }

  const updateBudgetCategory = async (requestBody: BudgetCategoryRequest) => {
    try {
      setLoading(true);
      const { data, status} = await axiosInstance.put<BudgetCategoryDto>(Envs.apiUrl + '/budgets/category', {
        ...requestBody
      });

      if ([200, 201].includes(status)) {
        const categoriesClone = categories;
        const idx = categoriesClone.findIndex(category => category.id === data.id)
        categoriesClone[idx] = data;
        setCategories(categoriesClone);
      }
    } catch(ex) {
      console.log(ex)
    } finally {
      setLoading(false);
    }
  }

  const createBudgetCategory = async (requestBody: BudgetCategoryRequest) => {
    try {
      setLoading(true);
      const { data, status} = await axiosInstance.post<BudgetCategoryDto>(Envs.apiUrl + '/budgets/category', {
        ...requestBody
      });

      if ([200, 201].includes(status)) {
        const categoriesClone = categories;
        categoriesClone.push(data)
        setCategories(categoriesClone);
      }
    } catch(ex) {
      console.log(ex)
    } finally {
      setLoading(false);
    }
  }

  const deleteBudgetCategory = async (categoryId: number) => {
    try {
      setLoading(true);
      const { status } = await axiosInstance.post(Envs.apiUrl + '/budgets/category', {
        id: categoryId
      });

      if ([200, 201].includes(status)) {
        const categoriesClone = categories.filter(c => c.id !== categoryId);
        setCategories(categoriesClone)
      }
    } catch(ex) {
      console.log(ex)
    } finally {
      setLoading(false);
    }
  }

  const refresh = async () => {
    await fetchCategories();
  }

  useEffect(() => {
    refresh();
  }, [])

  return { fetchCategories, createBudgetCategory, updateBudgetCategory, deleteBudgetCategory, categories, error, loading, refresh }
}