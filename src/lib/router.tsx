import { createBrowserRouter } from "react-router-dom";

import {
  LoginScreen,
  SelectTask,
  TakeABreak,
  MultipleProjects,
  AttributeHour,
  BreakReason,
  BreakTimer,
  Consultations,
  Scrum,
  CreateConsultation,
  CreateTask,
  EditConsultation,
  SelectTaskForConsult,
  LogConsultation,
  CreateTaskForConsultation,
} from "../screens";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MultipleProjects />,
  },
  {
    path: "login",
    element: <LoginScreen />,
  },
  {
    path: "take-a-break",
    element: <TakeABreak />,
  },
  {
    path: "select-task",
    element: <SelectTask />,
  },
  {
    path: "attribute-hour",
    element: <AttributeHour />,
  },
  {
    path: "break-reason",
    element: <BreakReason />,
  },
  {
    path: "break-timer",
    element: <BreakTimer />,
  },
  {
    path: "consultations",
    element: <Consultations />,
  },
  {
    path: "scrum",
    element: <Scrum />,
  },
  {
    path: "create-consultation",
    element: <CreateConsultation />,
  },
  {
    path: "create-task",
    element: <CreateTask />,
  },
  {
    path: "edit-consultation",
    element: <EditConsultation />,
  },
  {
    path: "select-task-for-consultation",
    element: <SelectTaskForConsult />,
  },
  {
    path: "log-consultation",
    element: <LogConsultation />,
  },
  {
    path: "create-task-for-consultation",
    element: <CreateTaskForConsultation />,
  },
]);

export default router;
