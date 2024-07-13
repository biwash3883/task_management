import React from "react";
import { useLocation } from "react-router-dom";
import TaskTable from "./TaskTable";
import { WelcomeCard } from "./WelcomeCard";

const Dashboard: React.FC = () => {
  const location = useLocation();
  const username = location.state?.username;

  return (
    <>
      <WelcomeCard username={username} />
      <br />
      <TaskTable />
    </>
  );
};

export default Dashboard;
