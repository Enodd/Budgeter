import { useEffect, useState } from "react"
import axiosInstance from '../services/axiosService';
import { Envs } from "../lib/envs";
import { useTranslation } from "react-i18next";
import { Transaction, TransactionRequest, TransactionUpdateRequest } from "../lib/Transaction";

export const useTransactions = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string>();

  const fetchTransactions = async (id?: number) => {
    try {
      setError(undefined);
      setLoading(true);
      const { data } = await axiosInstance.get<Transaction[]>(Envs.apiUrl + '/transaction' + (id ? `?id=${id}` : ''));
      setTransactions(data);
      setLoading(false);
    } catch (ex) {
      console.error(ex)
      setError(t('fetch.error', { message: ex }))
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }

  const updateTransaction = async (requestBody: TransactionUpdateRequest) => {
    try {
      setLoading(true);
      const { data, status} = await axiosInstance.put<Transaction>(Envs.apiUrl + '/transaction', {
        ...requestBody
      });

      if ([200, 201].includes(status)) {
        const transactionCore = transactions;
        const idx = transactionCore.findIndex(transaction => transaction.id === data.id)
        transactionCore[idx] = data;
        setTransactions(transactionCore);
      }
    } catch(ex) {
      console.log(ex)
    } finally {
      setLoading(false);
    }
  }

  const createTransaction = async (requestBody: TransactionRequest) => {
    try {
      setLoading(true);
      const { data, status} = await axiosInstance.post<TransactionRequest>(Envs.apiUrl + '/transaction', {
        ...requestBody
      });

      if ([200, 201].includes(status)) {
        const transactionClone = transactions;
        transactionClone.push(data)
        setTransactions(transactionClone);
      }
    } catch(ex) {
      console.log(ex)
    } finally {
      setLoading(false);
    }
  }

  const deleteTranslation = async (transactionId: number) => {
    try {
      setLoading(true);
      const { status } = await axiosInstance.post(Envs.apiUrl + '/transaction', {
        id: transactionId
      });

      if ([200, 201].includes(status)) {
        const transactionClone = transactions.filter(t => t.id !== transactionId);
        setTransactions(transactionClone)
      }
    } catch(ex) {
      console.log(ex)
    } finally {
      setLoading(false);
    }
  }

  const refresh = async () => {
    await fetchTransactions();
  }

  useEffect(() => {
    refresh();
  }, [])

  return { fetchTransactions, createTransaction, updateTransaction, deleteTranslation, transactions, error, loading, refresh }
}