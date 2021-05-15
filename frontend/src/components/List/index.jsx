import React from "react";
import "./List.scss";
import classNames from "classnames";
import axios from "axios";

import removeSvg from "../../assets/img/remove.svg";
import Badge from "../Badge";

export default function List({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem,
}) {
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить раздел?")) {
      axios.delete("http://localhost:8000/api/category/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul className="list" onClick={onClick}>
      {items.map((item, index) => (
        <li
          onClick={onClickItem ? () => onClickItem(item) : null}
          key={index}
          className={classNames(item.className, {
            active: item.active
              ? item.active
              : activeItem && activeItem.id === item.id,
          })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.title}
            {item.tasks && ` (${item.tasks.length})`}
          </span>
          {isRemovable && (
            <img
              src={removeSvg}
              alt="Remove icon"
              className="list__remove-icon"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
