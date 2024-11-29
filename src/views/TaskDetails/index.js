import React, { useState, useContext } from "react";
import { View, Text, Modal, TextInput, Button, TouchableOpacity } from "react-native";
import { BoardsContext } from "../../services/BoardsContext";
import DetailsToolbar from "../../components/DetailsToolbar";
import styles from "./styles";
import Icon from 'react-native-vector-icons/MaterialIcons';

const TaskDetails = ({ route }) => {
  const { boards, setBoards } = useContext(BoardsContext);
  const { boardId, listId, taskId } = route.params;

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

  const task = list.tasks.find((t) => t.id === taskId);
  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Task not found.</Text>
      </View>
    );
  }

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [isFinished, setIsFinished] = useState(task.isFinished);

  const handleEdit = () => {
    setEditedName(task.name);
    setEditedDescription(task.description);
    setEditModalVisible(true);
  };

  const saveEditedTask = () => {
    const updatedTask = { ...task, name: editedName, description: editedDescription };
    updateTaskInContext(updatedTask);
    setEditModalVisible(false);
  };

  const updateTaskInContext = (updatedTask) => {
    const updatedBoards = boards.map((b) => {
      if (b.id === boardId) {
        return {
          ...b,
          lists: b.lists.map((l) => {
            if (l.id === listId) {
              return {
                ...l,
                tasks: l.tasks.map((t) => (t.id === taskId ? updatedTask : t)),
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

  const toggleCompletionStatus = () => {
    const updatedTask = { ...task, isFinished: !isFinished };
    setIsFinished(!isFinished);
    updateTaskInContext(updatedTask);
  };

  return (
    <>
      <DetailsToolbar
        selectionMode={false}
        onEdit={handleEdit}
        title="Task Details"
        showAdd={false} 
      />
      <View style={styles.container}>
        <View style={styles.taskDetailsContainer}>
          <TouchableOpacity onPress={toggleCompletionStatus} style={styles.completionIcon}>
            <Icon
              name={isFinished ? "check-box" : "check-box-outline-blank"}
              size={30}
              color={isFinished ? "#007AFF" : "#ccc"}
            />
          </TouchableOpacity>
          <Text style={[styles.taskName, isFinished && styles.taskNameCompleted]}>
            {task.name}
          </Text>
          <Text style={[styles.taskDescription, isFinished && styles.taskDescriptionCompleted]}>
            {task.description}
          </Text>
        </View>
      </View>
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              style={styles.input}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Task Name"
            />
            <TextInput
              style={styles.input}
              value={editedDescription}
              onChangeText={setEditedDescription}
              placeholder="Task Description"
            />
            <Button title="Save" onPress={saveEditedTask} />
            <Button
              title="Cancel"
              onPress={() => setEditModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TaskDetails;
