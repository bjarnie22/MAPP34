import React from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import styles from "./styles";

const Toolbar = ({
  boardName,
  setBoardName,
  onAdd,
  selectionMode,
  cancelSelectionMode,
  deleteSelectedBoards,
}) => {
  if (selectionMode) {
    return (
      <View style={styles.toolbar}>
        <TouchableHighlight
          style={styles.toolbarAction}
          onPress={cancelSelectionMode}
        >
          <Text style={styles.toolbarActionText}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.toolbarAction}
          onPress={deleteSelectedBoards}
        >
          <Text style={styles.toolbarActionText}>Delete Selected</Text>
        </TouchableHighlight>
      </View>
    );
  } else {
    return (
      <View style={styles.toolbar}>
        <TextInput
          style={styles.input}
          placeholder="Enter board name"
          value={boardName}
          onChangeText={setBoardName}
        />
        <TouchableHighlight style={styles.toolbarAction} onPress={onAdd}>
          <Text style={styles.toolbarActionText}>Add Board</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

export default Toolbar;
