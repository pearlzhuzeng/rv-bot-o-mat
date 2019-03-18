import React, { useState } from "react";
import styled from "styled-components";

import { RobotTypes } from "./shared";
import { IRobot, ITask } from "../types";

type Props = {
  robot: IRobot;
  onStart: () => any;
};

export default function MyRobot({ robot, onStart }: Props) {
  return (
    <div>
      <h3>
        {name}
        <TypeSpan>{RobotTypes[robot.type]}</TypeSpan>
      </h3>
      <h4>Tasks:</h4>
      <button onClick={onStart}>Start Working</button>
      <ul>
        {robot.completedTasks.map(task => (
          <Task status="completed" task={task} />
        ))}
        {robot.currentTask && (
          <Task status="working" task={robot.currentTask} />
        )}
        {robot.todoTasks.map(task => (
          <Task status="todo" task={task} />
        ))}
      </ul>
    </div>
  );
}

type TaskProps = {
  task: ITask;
  status: "todo" | "working" | "completed";
};

function Task({ task, status }: TaskProps) {
  return (
    <li>
      {status === "working" ? (
        <i className="fas fa-spinner fa-spin" />
      ) : status === "completed" ? (
        <CompleteIcon className="fas fa-check-circle" />
      ) : null}{" "}
      description: {task.description}; duration: {task.duration / 1000} seconds
    </li>
  );
}

const TypeSpan = styled.span`
  margin-left: 0.3em;
  font-size: 0.8em;
  background-color: #ddd;
  padding: 0.1em 0.5em;
  border-radius: 3px;
`;

const CompleteIcon = styled.i`
  color: green;
`;
