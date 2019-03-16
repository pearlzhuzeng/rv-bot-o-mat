import { RobotType, ITask } from "../types";

export const RobotTypes: { [type: string]: RobotType } = {
  Unipedal: RobotType.Unipedal,
  Bipedal: RobotType.Bipedal,
  Quadrupedal: RobotType.Quadrupedal,
  Arachnid: RobotType.Arachnid,
  Radial: RobotType.Radial,
  Aeronautical: RobotType.Aeronautical
};

const TASKS: { [key: string]: ITask } = {
  dishes: { description: "Do the dishes", duration: 1000 },
  house: { description: "Sweep the house", duration: 3000 },
  recycling: { description: "Take out the recycling", duration: 4000 },
  sammich: { description: "Make a sammich", duration: 7000 },
  cookies: { description: "Bake some cookies", duration: 8000 },
  laundry: { description: "Do the laundry", duration: 10000 },
  dog: { description: "Give the dog a bath", duration: 14500 },
  leaves: { description: "Rake the leaves", duration: 18000 },
  car: { description: "Wash the car", duration: 20000 },
  lawn: { description: "Mow the lawn", duration: 20000 }
};

const TASK_LISTS: Map<RobotType, string[]> = new Map([
  [RobotType.Unipedal, ["recycling", "sammich", "laundry", "cookies", "dog"]],
  [RobotType.Bipedal, ["sammich", "dog", "recycling", "leaves", "lawn"]],
  [RobotType.Quadrupedal, ["laundry", "car", "dishes", "house", "recycling"]],
  [RobotType.Arachnid, ["house", "sammich", "dishes", "dog", "laundry"]],
  [RobotType.Radial, ["dishes", "leaves", "dog", "cookies", "lawn"]],
  [RobotType.Aeronautical, ["cookies", "lawn", "house", "recycling", "car"]]
]);

export function getTodos(type: RobotType): ITask[] {
  const todoKeys = TASK_LISTS.get(type);
  if (todoKeys == null) return [];

  return Object.keys(TASKS)
    .filter(key => todoKeys.includes(key))
    .map(key => TASKS[key]);
}
