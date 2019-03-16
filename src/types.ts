export interface IRobotBio {
  name: string;
  type: RobotType;
}

export enum RobotType {
  Unipedal = "Unipedal",
  Bipedal = "Bipedal",
  Quadrupedal = "Quadrupedal",
  Arachnid = "Arachnid",
  Radial = "Radial",
  Aeronautical = "Aeronautical"
}

export interface IRobot extends IRobotBio {
  working: boolean;
  todoTasks: ITask[];
  currentTask: ITask | null;
  completedTasks: ITask[];
}

export interface ITask {
  description: string;
  duration: number;
}
