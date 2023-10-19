import { TaskTime } from "@/types";

const checkIfTimerOff = (tasks: TaskTime[] | undefined) => {
  // console.log('tasks', tasks)
  return tasks?.filter((x: any) => x.task.timer_on === 0)
}

export default checkIfTimerOff;
