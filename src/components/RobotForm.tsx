import React, { FormEvent, useState } from "react";

import { RobotTypes, getTodos } from "./shared";

import { IRobot, IRobotBio } from "../types";

type Props = {
  onSubmit: (robot: IRobot) => void;
};

export default function RobotForm({ onSubmit }: Props) {
  const [draftRobotBio, setDraftRobotBio] = useState<Partial<IRobotBio>>({
    name: "",
    type: undefined
  });

  const { name, type } = draftRobotBio;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !type) return;

    const draftRobot = {
      name,
      type,
      working: false,
      todoTasks: getTodos(type),
      currentTask: null,
      completedTasks: []
    };
    onSubmit(draftRobot);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={e =>
            setDraftRobotBio({ ...draftRobotBio, name: e.target.value })
          }
        />
      </label>
      <label>
        Pick your robot type:
        <select
          value={type}
          onChange={e =>
            setDraftRobotBio({
              ...draftRobotBio,
              type: RobotTypes[e.target.value]
            })
          }
        >
          <option value="">--–</option>
          {Object.entries(RobotTypes).map(([key, type]) => {
            return (
              <option key={key} value={key}>
                {type}
              </option>
            );
          })}
        </select>
      </label>
      <input disabled={!name || !type} type="submit" value="Set Robot" />
    </form>
  );
}
