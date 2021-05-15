import React, { useState } from "react";
import addSvg from "../../assets/img/add.svg";

import axios from "axios";

const AddTaskForm = ({ list, onAddTask }) => {
  const [formVisible, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleFormVisible = () => {
    setFormVisible(!formVisible);
    setInputValue("");
  };

  const addTask = () => {
    const obj = {
      category: list.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post("http://localhost:8000/api/tasks/", obj)
      .then(({ data }) => {
        onAddTask(list.id, obj);
        toggleFormVisible();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {!formVisible ? (
        <div className="tasks__form-new" onClick={toggleFormVisible}>
          <img src={addSvg} alt="Add icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            value={inputValue}
            type="text"
            className="field"
            placeholder="Текст задачи"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="button" onClick={addTask}>
            {isLoading ? "Добавление..." : "Добавить задачу"}
          </button>
          <button className="button button--grey" onClick={toggleFormVisible}>
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
