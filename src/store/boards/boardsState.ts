export interface Project {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  description: string;
  completed: boolean;
}

export interface BoardsState {
  selectedProject: string;
  projects: {
    [key: string]: Project;
  };
}
