import React, { useReducer, useEffect } from "react";
import styled from "styled-components";
import produce from "immer";

import RobotForm from "./components/RobotForm";
import MyRobot from "./components/MyRobot";

import { IRobot } from "./types";

function delay(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

type RobotChange =
  | { type: "set"; robot: IRobot }
  | { type: "start task" }
  | { type: "finish task" };

const reducer = (state: IRobot | null, action: RobotChange) =>
  produce(state, draft => {
    switch (action.type) {
      case "set":
        return action.robot;

      case "start task":
        if (draft == null || draft.todoTasks.length === 0) break;

        draft.working = true;
        draft.currentTask = draft.todoTasks.shift() || null;

        break;

      case "finish task":
        if (draft == null || draft.currentTask == null) break;

        draft.completedTasks.push(draft.currentTask);
        draft.currentTask = null;

        if (draft.todoTasks.length === 0) draft.working = false;

        break;
    }
  });

export default function Botomatic() {
  const [robot, dispatch] = useReducer(reducer, null);

  useEffect(() => {
    async function workOnTask() {
      if (robot && robot.currentTask != null) {
        await delay(robot.currentTask.duration);
        dispatch({ type: "finish task" });
        dispatch({ type: "start task" });
      }
    }

    workOnTask();
  }, [robot, dispatch]);

  return (
    <Main>
      <RobotForm onSubmit={robot => dispatch({ type: "set", robot: robot })} />
      {robot && (
        <MyRobot
          robot={robot}
          onStart={() => dispatch({ type: "start task" })}
        />
      )}
    </Main>
  );
}

const Main = styled.main`
  margin: 0 auto;
  max-width: 60em;
  margin-top: 3em;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;
