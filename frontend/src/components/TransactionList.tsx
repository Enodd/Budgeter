import React, { useEffect, useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Transaction } from "../lib/Transaction";

export const TransactionList: React.FC<{list?: Transaction[]}> = ({ list }) => {
  const { transactions: fetchedTransactions } = useTransactions();
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const transactions = list || fetchedTransactions;

  return <Grid container>
    <Grid size={12}>
      <Typography align="center">
        {t('dashboard.transactions')}
      </Typography>
    </Grid>
    <Grid size={12}>
      <TableContainer>
        <Table>

        <TableHead>
            <TableRow>
            <TableCell>
              {t('dashboard.transaction.id')}
            </TableCell>
            <TableCell>
              {t('dashboard.transaction.description')}
            </TableCell>
            <TableCell>
              {t('dashboard.transaction.category')}
            </TableCell>
            <TableCell>
              {t('dashboard.transaction.amount')}
            </TableCell>
            <TableCell>
              {t('dashboard.transaction.type')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.slice(0 + rowsPerPage * (page), rowsPerPage + rowsPerPage * (page)).map(transaction => {
              return <TableRow>
            <TableCell>
              {transaction.id}
            </TableCell>
            <TableCell>
              {transaction.description}
            </TableCell>
            <TableCell>
              {transaction.budgetCategory?.name}
            </TableCell>
            <TableCell>
              {transaction.amount}
            </TableCell>
            <TableCell>
              {t('dashboard.transaction.' + transaction.type?.toLowerCase())}
            </TableCell>
          </TableRow>
          })}
        </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        count={transactions.length}
        page={page}
        component={'div'}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, v) => setPage(v)}
        onRowsPerPageChange={(e => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0)})}
      />
    </Grid>
  </Grid>
}