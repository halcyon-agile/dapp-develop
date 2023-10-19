import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isGraphVisible = (data: any) => {
  if (
    data?.task?.project?.project_type?.show_remaining_hours !== 0 ||
    Number(data?.task?.assignees[0]?.initial_estimate) !== 0 ||
    Number(data?.task?.assignees[0]?.estimate) !== 0 ||
    data?.total_minutes_spent !== 0
  ) {
    return true;
  }

  if (data?.consultation_id === null) return true;

  return false;
};

export const formatHours = (hours: number) => {
  const absoluteHours = Math.floor(Math.abs(hours));
  const absoluteMinutes = Math.floor((Math.abs(hours) * 60) % 60);
  const formattedHours = String(absoluteHours).padStart(2, "0");
  const formattedMinutes = String(absoluteMinutes).padStart(2, "0");
  const sign = hours < 0 ? "-" : "";

  return `${sign}${formattedHours}:${formattedMinutes}`;
};

export const getCurrentHoursSpentOnTask = (started_at: string) => {
  const now = new Date();
  const startedAt = new Date(started_at);
  const duration = now.getTime() - startedAt.getTime();
  const hours = duration / (1000 * 60 * 60); // Convert milliseconds to hours

  return hours;
};
