import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const DetailsToolbar = ({
  selectionMode,
  selectedCount,
  cancelSelectionMode,
  deleteSelectedLists,
}) => {
  return (
    <View style={styles.toolbar}>
      {selectionMode ? (
        <>
          <TouchableOpacity
            onPress={cancelSelectionMode}
            style={styles.toolbarAction}
          >
            <Text style={styles.toolbarActionText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={deleteSelectedLists}
            style={styles.toolbarAction}
          >
            <Text style={styles.toolbarActionText}>Delete</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.toolbarAction}>
            <Text style={styles.toolbarActionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarAction}>
            <Text style={styles.toolbarActionText}>Add</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default DetailsToolbar;
