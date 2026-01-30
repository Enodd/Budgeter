import React from 'react';
import { BudgetList } from '../components/BudgetList.tsx';
import { Grid } from '@mui/material';
import { TransactionList } from '../components/TransactionList.tsx';
import { BudgetChart } from '../components/charts/BudgetChart.tsx';
import { FinancialGoalChart } from '../components/charts/FinancialGoal.tsx';
import { TransactionChart } from '../components/charts/TransactionChart.tsx';
import { useBudgets } from '../hooks/useBudgets.ts';
import { useTransactions } from '../hooks/useTransactions.ts';
import { useFinancialGoals } from '../hooks/useFinancialGoals.ts';

const Dashboard: React.FC = () => {
  const { budgets } = useBudgets();
  const { transactions } = useTransactions();
  const { financialGoals } = useFinancialGoals();

  return (
    <Grid
      container
      sx={{ width: '100%' }}
    >
      <Grid size={2}>
        <BudgetList />
      </Grid>
      <Grid container size={10} sx={{ height: '90vh', overflowY: 'auto' }}>
        <Grid size={12}>
          <TransactionList />
        </Grid>
        <Grid size={6}>
          <BudgetChart
            data={budgets}
            period={'month'}
          />
        </Grid>
        <Grid size={6}>
          <TransactionChart
            data={transactions}
            period={'month'}
          />
        </Grid>
        <Grid size={6}>
          <FinancialGoalChart
            data={financialGoals}
            period={'month'}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
