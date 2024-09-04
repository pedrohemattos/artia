export interface Activity {
  activityId: string
  projectId: string
  name: string
  startDate: string
  endDate: string  
  completed: boolean
}

export interface Project {
  projectId: string
  name: string
  startDate: string
  endDate: string
  completed: boolean
}

export interface ProjectDetails {
  projectId: string
  name: string
  overdue: boolean
  progress: number
  startDate: string
  endDate: string
  completed: boolean
  activities: Activity[]
}