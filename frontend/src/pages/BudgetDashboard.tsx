import {Grid, Table, TableBody, TableCell, TableHead, Typography} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BudgetList } from '../components/BudgetList';
import { useParams } from 'react-router-dom';
import { BudgetDto } from '../lib/Budget';
import React, { useEffect, useState } from 'react';
import { useBudgets } from '../hooks/useBudgets';

export const BudgetDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentBudget, setCurrentBudget] = useState<BudgetDto>();
  const { t } = useTranslation();
  const { fetchBudgets } = useBudgets();

  useEffect(() => {
    fetchBudgets(Number(id)).then((budgets) => {
      if (!(budgets instanceof Array)) {
        setCurrentBudget(budgets);
      }
    });
  }, [id]);

  return (
    <Grid
      container
      sx={{ width: '100%' }}
    >
      <Grid size={12}>
        <Typography
          variant='h2'
          align='center'
        >
          {t('budgetDashboard.title')}
        </Typography>
      </Grid>
      <Grid size={2}>
        <BudgetList />
      </Grid>
      <Grid size={10}>
        <Table>
          <TableHead>
            <TableCell>
              {t('budgetDashboard.budget.id')}
            </TableCell>
            <TableCell>
              {t('budgetDashboard.budget.name')}
            </TableCell>
            <TableCell>
              {t('budgetDashboard.budget.periodStart')}
            </TableCell>
            <TableCell>
              {t('budgetDashboard.budget.periodEnd')}
            </TableCell>
            <TableCell>
              {t('budgetDashboard.budget.totalLimit')}
            </TableCell>
            <TableCell>
              {t('budgetDashboard.budget.transactionCount')}
            </TableCell>
          </TableHead>
          <TableBody>
            <TableCell>
              {currentBudget?.id}
            </TableCell>
            <TableCell>
              {currentBudget?.name}
            </TableCell>
            <TableCell>
              {currentBudget?.periodStart}
            </TableCell>
            <TableCell>
              {currentBudget?.periodEnd}
            </TableCell>
            <TableCell>
              {currentBudget?.totalLimit}
            </TableCell>
            <TableCell>
              {currentBudget?.transactions?.length}
            </TableCell>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};
