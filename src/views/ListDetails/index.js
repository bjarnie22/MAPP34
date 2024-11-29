import React, { useState, useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { BoardsContext } from "../../services/BoardsContext";
import DetailsToolbar from "../../components/DetailsToolbar";
import Task from "../../components/Task";
import styles from "./styles";

const ListDetails = ({ route }) => {
  const { boards, setBoards } = useContext(BoardsContext);
  const { listId, boardId } = route.params;
  const board = boards.find((b) => b.id === boardId);
  const list = board.lists.find((l) => l.id === listId);
  const [listTasks, setListTasks] = useState(list.tasks);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const listColor = list.color || colors.postitYellow;
  
  const handleTaskPress = (task) => {
    if (selectionMode) {
      if (selectedTasks.includes(task.id)) {
        setSelectedTasks(selectedTasks.filter((taskId) => taskId !== task.id));
      } else {
        setSelectedTasks([...selectedTasks, task.id]);
      }
    } else {
      // Implement navigation to TaskDetails if needed
    }
  };

  const handleTaskLongPress = (id) => {
    setSelectionMode(true);
    setSelectedTasks([id]);
  };

  const deleteSelectedTasks = () => {
    const newTasks = listTasks.filter(
      (task) => !selectedTasks.includes(task.id)
    );
    setListTasks(newTasks);
    setSelectionMode(false);
    setSelectedTasks([]);
  };

  const cancelSelectionMode = () => {
    setSelectionMode(false);
    setSelectedTasks([]);
  };

  const handleToggleCheckbox = (taskId, newStatus) => {
    const updatedTasks = listTasks.map((task) =>
      task.id === taskId ? { ...task, isFinished: newStatus } : task
    );
    setListTasks(updatedTasks);
  
    const updatedBoards = boards.map((b) => {
      if (b.id === boardId) {
        return {
          ...b,
          lists: b.lists.map((l) => {
            if (l.id === listId) {
              return { ...l, tasks: updatedTasks };
            }
            return l;
          }),
        };
      }
      return b;
    });
  
    setBoards(updatedBoards);
  };

  return (
    <>
      <DetailsToolbar
        selectionMode={selectionMode}
        selectedCount={selectedTasks.length}
        cancelSelectionMode={cancelSelectionMode}
        deleteSelectedTasks={deleteSelectedTasks}
      />
      <View style={{ flex: 1, backgroundColor: listColor}}>
        <FlatList
          data={listTasks}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Text style={styles.title}>{list.name}</Text>
            </View>
          }
          renderItem={({ item }) => (
            <Task
              task={item}
              selectionMode={selectionMode}
              isSelected={selectedTasks.includes(item.id)}
              onPress={handleTaskPress}
              onLongPress={handleTaskLongPress}
              onToggleCheckbox={handleToggleCheckbox}
            />
          )}
        />
      </View>
    </>
  );
};

export default ListDetails;
