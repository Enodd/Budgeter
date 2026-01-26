import React from "react"
import {useTranslation} from "react-i18next";

const Dashboard: React.FC = () => {
  const {t} = useTranslation();
  
  return <div className={"bg-primary-main/50"}>
    <h2>{t("dashboard.title")}</h2>
  </div>
}

export default Dashboard