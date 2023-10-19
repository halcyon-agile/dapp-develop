import { getCurrentHoursSpentOnTask } from "./utils"

const checkIfRequiredToUpdateEstimate = (userID: string | undefined, list: any[], data: any) => {
  // console.log('userId', userID)
  // console.log('list', list)
  // console.log('task', data)
  const getUserFromList = list.find((x: any) => x.admin_id === userID)
  if (data?.task?.require_estimate_time === 1) {
    const totalRenderedHours = Number(Number(data?.total_minutes_spent / 60).toFixed(2)) + getCurrentHoursSpentOnTask(data?.started_at)
    // console.log('total rendered', totalRenderedHours)
    if (getUserFromList) {
      // console.log(Math.floor(totalRenderedHours / Number(data?.task.estimate_time)))
      if (Math.floor(totalRenderedHours / Number(data?.task.estimate_time)) > getUserFromList?.estimate_update_counter) {
        return true
      } else {
        return false
      }
    }
  }
  if (getUserFromList) {
    if (getUserFromList?.require_estimate_today) {
      return true
    }
  }
  return false;
}

export default checkIfRequiredToUpdateEstimate;
