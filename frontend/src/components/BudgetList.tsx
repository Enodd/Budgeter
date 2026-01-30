import React, {useState} from 'react'
import {Button, List, ListItem, Pagination, Stack} from "@mui/material";
import {useBudgets} from "../hooks/useBudgets.ts";
import {useNavigate} from "react-router-dom";

export const BudgetList: React.FC = () => {
  const {budgets} = useBudgets();
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(1);
  
  return <Stack borderRight={'1px solid black'} height={'90vh'} maxHeight={'100%'} justifyContent={'space-between'}>
    <List>
      {budgets.slice(0 + 15 * (page - 1), 15 + 15 * (page - 1)).map(budget => {
        return <ListItem>
          <Button onClick={() => navigate("/budgets/"+budget.id)}>
            {budget.name}
          </Button>
        </ListItem>
      })}
    </List>
    <Pagination color='primary' count={budgets.length / 20} page={page} onChange={(_, v) => setPage(v)} siblingCount={0}/>
  </Stack>
}