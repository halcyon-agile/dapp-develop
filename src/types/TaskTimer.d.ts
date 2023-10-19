declare module 'react-ios-time-picker' {
  interface TaskTimerProps {
    value?: string,
  }

  const TaskTimer: React.ComponentClass<TaskTimerProps>;
  
  export {TaskTimer, TaskTimerProps}
}