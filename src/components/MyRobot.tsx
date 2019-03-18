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
        {robot.name}
        <TypeSpan>{RobotTypes[robot.type]}</TypeSpan>
      </h3>
      <h4>Tasks:</h4>
      <button onClick={onStart} disabled={robot.working}>
        Start Working
      </button>
      <ul>
        {robot.completedTasks.map(task => (
          <Task key={task.description} status="completed" task={task} />
        ))}
        {robot.currentTask && (
          <Task status="working" task={robot.currentTask} />
        )}
        {robot.todoTasks.map(task => (
          <Task key={task.description} status="todo" task={task} />
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
    <List>
      {status === "working" ? (
        <i className="fas fa-spinner fa-spin" />
      ) : status === "completed" ? (
        <i className="fas fa-check-circle" style={{ color: "green" }} />
      ) : (
        <i className="fas fa-circle" style={{ color: "lightgrey" }} />
      )}
      description: {task.description}; duration: {task.duration / 1000} seconds
    </List>
  );
}

const TypeSpan = styled.span`
  margin-left: 0.3em;
  font-size: 0.8em;
  background-color: #ddd;
  padding: 0.1em 0.5em;
  border-radius: 3px;
`;

const List = styled.li`
  list-style: none;

  i {
    margin-right: 0.5em;
  }
`;
