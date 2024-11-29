// src/views/ListDetails/ListDetails.js

import React, { useState, useContext } from "react";
import { View, Text, FlatList, Modal, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BoardsContext } from "../../services/BoardsContext";
import DetailsToolbar from "../../components/DetailsToolbar";
import Task from "../../components/Task";
import styles from "./styles";

const ListDetails = ({ route }) => {
  const { boards, setBoards } = useContext(BoardsContext);
  const { listId, boardId } = route.params;
  const navigation = useNavigation();

  const board = boards.find((b) => b.id === boardId);
  if (!board) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Board not found.</Text>
      </View>
    );
  }

  const list = board.lists.find((l) => l.id === listId);
  if (!list) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>List not found.</Text>
      </View>
    );
  }

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedName, setEditedName] = useState(list.name);
  const [editedColor, setEditedColor] = useState(list.color || "");

  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAdd = () => {
    setNewTaskName("");
    setNewTaskDescription("");
    setAddModalVisible(true);
  };

  const addTask = () => {
    if (newTaskName.trim() !== "") {
      const newTask = {
        id: Date.now(),
        name: newTaskName,
        description: newTaskDescription,
        isFinished: false,
      };

      const updatedBoards = boards.map((b) => {
        if (b.id === boardId) {
          return {
            ...b,
            lists: b.lists.map((l) =>
              l.id === listId ? { ...l, tasks: [...l.tasks, newTask] } : l
            ),
          };
        }
        return b;
      });

      setBoards(updatedBoards);
      setAddModalVisible(false);
    }
  };

  const handleTaskPress = (task) => {
    if (selectionMode) {
      if (selectedTasks.includes(task.id)) {
        setSelectedTasks(selectedTasks.filter((taskId) => taskId !== task.id));
      } else {
        setSelectedTasks([...selectedTasks, task.id]);
      }
    } else {
      navigation.navigate("Task Details", {
        boardId: boardId,
        listId: listId,
        taskId: task.id,
      });
    }
  };

  const handleTaskLongPress = (id) => {
    setSelectionMode(true);
    setSelectedTasks([id]);
  };

  const deleteSelectedTasks = () => {
    const updatedBoards = boards.map((b) => {
      if (b.id === boardId) {
        return {
          ...b,
          lists: b.lists.map((l) => {
            if (l.id === listId) {
              return {
                ...l,
                tasks: l.tasks.filter(
                  (task) => !selectedTasks.includes(task.id)
                ),
              };
            }
            return l;
          }),
        };
      }
      return b;
    });

    setBoards(updatedBoards);
    setSelectionMode(false);
    setSelectedTasks([]);
  };

  const cancelSelectionMode = () => {
    setSelectionMode(false);
    setSelectedTasks([]);
  };

  const handleToggleCheckbox = (taskId, newStatus) => {
    const updatedBoards = boards.map((b) => {
      if (b.id === boardId) {
        return {
          ...b,
          lists: b.lists.map((l) => {
            if (l.id === listId) {
              return {
                ...l,
                tasks: l.tasks.map((task) =>
                  task.id === taskId ? { ...task, isFinished: newStatus } : task
                ),
              };
            }
            return l;
          }),
        };
      }
      return b;
    });
    setBoards(updatedBoards);
  };

  const handleEdit = () => {
    setEditedName(list.name);
    setEditedColor(list.color || "");
    setEditModalVisible(true);
  };

  const saveEditedList = () => {
    const updatedBoards = boards.map((b) => {
      if (b.id === boardId) {
        return {
          ...b,
          lists: b.lists.map((l) =>
            l.id === listId ? { ...l, name: editedName, color: editedColor } : l
          ),
        };
      }
      return b;
    });
    setBoards(updatedBoards);
    setEditModalVisible(false);
  };

  return (
    <>
      <DetailsToolbar
        selectionMode={selectionMode}
        selectedCount={selectedTasks.length}
        cancelSelectionMode={cancelSelectionMode}
        deleteSelectedItems={deleteSelectedTasks}
        onEdit={handleEdit}
        onAdd={handleAdd}
        title={list.name}
      />
      <View style={{ flex: 1, backgroundColor: list.color || "#fff" }}>
        <FlatList
          data={list.tasks}
          extraData={list.tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Task
              task={item}
              selectionMode={selectionMode}
              isSelected={selectedTasks.includes(item.id)}
              onPress={() => handleTaskPress(item)}
              onLongPress={() => handleTaskLongPress(item.id)}
              onToggleCheckbox={handleToggleCheckbox}
            />
          )}
        />
      </View>
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit List</Text>
            <TextInput
              style={styles.input}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="List Name"
            />
            <TextInput
              style={styles.input}
              value={editedColor}
              onChangeText={setEditedColor}
              placeholder="List Color"
            />
            <Button title="Save" onPress={saveEditedList} />
            <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Modal
        visible={isAddModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Task</Text>
            <TextInput
              style={styles.input}
              value={newTaskName}
              onChangeText={setNewTaskName}
              placeholder="Task Name"
            />
            <TextInput
              style={styles.input}
              value={newTaskDescription}
              onChangeText={setNewTaskDescription}
              placeholder="Task Description"
            />
            <Button title="Add Task" onPress={addTask} />
            <Button title="Cancel" onPress={() => setAddModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ListDetails;
