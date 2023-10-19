import React from "react";

export interface Attendance {
  id: number;
  started_at: string;
  ended_at: string;
}

export interface TaskTime {
  consultation_id: number;
  id: number;
  name: string;
  started_at: string;
  ended_at: string;
  task: {
    id: number;
    name: string;
    started_at: string;
    ended_at: string;
    timer_on: number;
    project: {
      id: number;
      name: string;
    };
  };
}

export interface Scrum {
  id: number;
  name: string;
  started_at: string;
  ended_at: string;
  project: {
    id: number;
    name: string;
  };
}

export interface Task {
  id: number;
  name: string;
  started_at: string;
  ended_at: string;
  project: {
    id: number;
    name: string;
  };
}

export interface Project {
  id: number;
  name: string;
  started_at: string;
  ended_at: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  has_active_task_time?: boolean;
  attendance?: {
    id: number;
    started_at: string;
    ended_at: string;
  };
  first_name?: string;
  last_name?: string;
}

export interface Breaks {
  id: number;
  started_at: string;
  reason: string;
  minutes: number;
}

export interface BreaksData {
  breaks: Breaks[];
  total_hours: number;
}

export interface ConsultationInvites {
  id: number;
}

export interface Consultations {
  started_at: string;
  type: string;
  task: any;
  id: number;
}

export interface RequestConsultation {
  id: number;
  started_at: string;
  duration: string;
  type: "fixed" | "flexible";
  member: number[];
}

export interface BreakForm {
  reason: string;
  hours: number;
  minutes: number;
}

export interface TaskType {
  id: number;
  name: string;
  description: string;
}
