import React, { createContext, useState, useEffect } from "react";

export const BoardsContext = createContext();

export const BoardsProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const jsonData = require("../resources/data.json");
    const nestedBoards = processData(jsonData);
    setBoards(nestedBoards);
  }, []);

  const processData = (data) => {
    const { boards, lists, tasks } = data;

    const listsById = {};
    const boardsById = {};

    boards.forEach((board) => {
      boardsById[board.id] = { ...board, lists: [] };
    });

    lists.forEach((list) => {
      listsById[list.id] = { ...list, tasks: [] };
    });

    tasks.forEach((task) => {
      const list = listsById[task.listId];
      if (list) {
        list.tasks.push(task);
      } else {
        console.warn(
          `List with id ${task.listId} not found for task ${task.id}`
        );
      }
    });

    Object.values(listsById).forEach((list) => {
      const board = boardsById[list.boardId];
      if (board) {
        board.lists.push(list);
      } else {
        console.warn(
          `Board with id ${list.boardId} not found for list ${list.id}`
        );
      }
    });

    return Object.values(boardsById);
  };

  return (
    <BoardsContext.Provider value={{ boards, setBoards }}>
      {children}
    </BoardsContext.Provider>
  );
};
