import React from "react";
import editSvg from "../../assets/img/edit.svg";
import axios from "axios";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

import "./Tasks.scss";

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Введите новое название", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:8000/api/category/" + list.id + "/", {
          title: newTitle,
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <div className="tasks">
      <h2 className="tasks__title" style={{ color: list.color.hex }}>
        {list.title}{" "}
        <img src={editSvg} alt="Edit icon" onClick={() => editTitle()} />
      </h2>

      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Нет задач</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              task={task}
              key={task.id}
              onRemove={onRemoveTask}
              list={list}
              onEdit={onEditTask}
              onComplete={onCompleteTask}
            />
          ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
