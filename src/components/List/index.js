import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";

const List = ({ list, selectionMode, isSelected, onPress, onLongPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(list)}
      onLongPress={() => onLongPress(list.id)}
      style={[
        styles.listContainer,
        selectionMode && isSelected && styles.selectedList,
      ]}
    >
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>{list.name}</Text>
        {selectionMode && (
          <Icon
            name={isSelected ? "check-box" : "check-box-outline-blank"}
            size={24}
            color={isSelected ? "#007AFF" : "#ccc"}
            style={styles.checkmarkIcon}
          />
        )}
      </View>
      {list.tasks && list.tasks.length > 0 ? (
        <View style={[styles.tasksContainer, { backgroundColor: list.color }]}>
          <FlatList
            data={list.tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <Text style={styles.taskName}>{item.name}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
              </View>
            )}
          />
        </View>
      ) : (
        <Text>No tasks available</Text>
      )}
    </TouchableOpacity>
  );
};

export default List;
