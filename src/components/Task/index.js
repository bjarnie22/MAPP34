import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";

const Task = ({
  task,
  selectionMode,
  isSelected,
  onPress,
  onLongPress,
  onToggleCheckbox,
}) => {
  const [isFinished, setIsFinished] = useState(task.isFinished);

  const toggleCheckbox = () => {
    const newStatus = !isFinished;
    setIsFinished(newStatus);
    onToggleCheckbox(task.id, newStatus);
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(task)}
      onLongPress={() => onLongPress(task.id)}
      style={[
        styles.taskContainer,
        selectionMode && isSelected && styles.selectedTask,
      ]}
    >
      <View style={styles.taskHeader}>
        {selectionMode ? (
          <Icon
            name={isSelected ? "check-box" : "check-box-outline-blank"}
            size={24}
            color={isSelected ? "#007AFF" : "#ccc"}
            style={styles.checkmarkIcon}
          />
        ) : (
          <CheckBox
            checked={isFinished}
            onPress={toggleCheckbox}
            containerStyle={styles.checkboxContainer}
            checkedColor="#007AFF"
          />
        )}
        <Text style={[styles.taskName, isFinished && styles.taskNameCompleted]}>
          {task.name}
        </Text>
      </View>
      <Text
        style={[
          styles.taskDescription,
          isFinished && styles.taskDescriptionCompleted,
        ]}
      >
        {task.description}
      </Text>
    </TouchableOpacity>
  );
};

export default Task;
