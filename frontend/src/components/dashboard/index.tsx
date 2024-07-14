import React from "react";
import TaskTable from "./TaskTable";
import { WelcomeCard } from "./WelcomeCard";

const Dashboard: React.FC = () => {
  return (
    <>
      <WelcomeCard />
      <br />
      <TaskTable />
    </>
  );
};

export default Dashboard;
