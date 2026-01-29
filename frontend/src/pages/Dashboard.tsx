import React from "react"
import {useTranslation} from "react-i18next";

const Dashboard: React.FC = () => {
  const {t} = useTranslation();
  
  return <div className={"bg-primary-main/50 w-full h-full grid grid-cols-4 md:w-[95%]"}>
    <h2 className="col-start-1 col-end-4 text-center">{t("dashboard.title")}</h2>
    <nav>
      {/*<BudgetList />*/}
    </nav>
    <div>
      {/*<TransactionList />*/}
      {/*<TransactionChart />*/}
      {/*<SpendingChart />*/}
      {/*<IncomeChart />*/}
    </div>
  </div>
}

export default Dashboard