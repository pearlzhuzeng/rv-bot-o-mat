import React, { FormEvent, useState } from "react";

import { IRobotBio, RobotType } from "../types";

export const RobotTypes = Object.keys(RobotType);

export default function RobotForm() {
  const [draftRobotBio, setDraftRobotBio] = useState<Partial<IRobotBio>>({
    name: "",
    type: RobotType.Unipedal
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(draftRobotBio.name, draftRobotBio.type);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={draftRobotBio.name}
          onChange={e =>
            setDraftRobotBio({ ...draftRobotBio, name: e.target.value })
          }
        />
      </label>
      <label>
        Pick your robot type:
        <select
          value={draftRobotBio.type}
          onChange={e =>
            setDraftRobotBio({ ...draftRobotBio, type: e.target.value })
          }
        >
          {RobotTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <input type="submit" value="Set Robot" />
    </form>
  );
}
