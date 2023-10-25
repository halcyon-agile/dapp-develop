import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BreakForm, Consultations, Scrum } from "@/types";

type State = {
  user?: any;
  notificationPermissionGranted: boolean;
  selectedTask: any;
  consultations: Consultations[];
  scrums: Scrum[];
  breakForm: BreakForm;
};

type Action = {
  setUser: (user: State["user"]) => void;
  setNotificationPermissionGranted: (
    notificationPermissionGranted: State["notificationPermissionGranted"]
  ) => void;
  setSelectedTask: (task: any) => void;
  setConsultations: (list: any) => void;
  setScrums: (list: any) => void;
  setBreakForm: (breakForm: any) => void;
};

const useStore = create(
  persist<State & Action>(
    (set) => ({
      user: undefined,
      setUser: (user) => set(() => ({ user })),
      notificationPermissionGranted: false,
      setNotificationPermissionGranted: (permissionGranted: boolean) =>
        set({ notificationPermissionGranted: permissionGranted }),
      selectedTask: null,
      setSelectedTask: (task: any) => set(() => ({ selectedTask: task })),
      consultations: [],
      setConsultations: (consultations: any) => set(() => ({ consultations })),
      scrums: [],
      setScrums: (scrums: any) => set(() => ({ scrums })),
      breakForm: {
        reason: "",
        hours: "0",
        minutes: "15",
      },
      setBreakForm: (breakForm: BreakForm) =>
        set(() => ({ breakForm: breakForm })),
    }),
    {
      name: "store",
    }
  )
);

export default useStore;
