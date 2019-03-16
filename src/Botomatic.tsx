import React, { useState } from "react";

import RobotForm from "./components/RobotForm";

export default function Botomatic() {
  const [robot, setRobot] = useState();

  return (
    <>
      <RobotForm onSubmit={setRobot} />
      <pre>{JSON.stringify(robot)}</pre>
    </>
  );
}
