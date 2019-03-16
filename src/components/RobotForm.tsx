import React, { FormEvent, useState } from "react";

import { RobotType, IRobot } from "../types";

export const RobotTypes: Map<string, RobotType> = new Map([
  ["Unipedal", RobotType.Unipedal],
  ["Bipedal", RobotType.Bipedal],
  ["Quadrupedal", RobotType.Quadrupedal],
  ["Arachnid", RobotType.Arachnid],
  ["Radial", RobotType.Radial],
  ["Aeronautical", RobotType.Aeronautical]
]);

export default function RobotForm() {
  const [draftRobot, setDraftRobot] = useState<Partial<IRobot>>({
    name: "",
    type: RobotType.Unipedal
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(draftRobot.name, draftRobot.type);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={draftRobot.name}
          onChange={e => setDraftRobot({ ...draftRobot, name: e.target.value })}
        />
      </label>
      <label>
        Pick your robot type:
        <select
          value={draftRobot.type}
          onChange={e =>
            setDraftRobot({
              ...draftRobot,
              type: RobotTypes.get(e.target.value)
            })
          }
        >
          {Array.from(RobotTypes.entries(), ([key, type]) => {
            return (
              <option key={key} value={type}>
                {type}
              </option>
            );
          })}
        </select>
      </label>
      <input type="submit" value="Set Robot" />
    </form>
  );
}
