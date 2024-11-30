import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const DetailsToolbar = ({
  selectionMode,
  selectedCount,
  cancelSelectionMode,
  deleteSelectedItems,
  onEdit,
  onAdd,
  onMove,
  title,
  showEdit = true,
  showAdd = true,
  showMove = false,
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
          <Text style={styles.toolbarTitle}>{`${selectedCount} Selected`}</Text>
          <View style={styles.toolbarAction}>
            {showMove && (
              <TouchableOpacity onPress={onMove} style={styles.toolbarAction}>
                <Text style={styles.toolbarActionText}>Move</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={deleteSelectedItems}
              style={styles.toolbarAction}
            >
              <Text style={styles.toolbarActionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {showEdit && (
            <TouchableOpacity onPress={onEdit} style={styles.toolbarAction}>
              <Text style={styles.toolbarActionText}>Edit</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.toolbarTitle}>{title}</Text>
          {showAdd && (
            <TouchableOpacity onPress={onAdd} style={styles.toolbarAction}>
              <Text style={styles.toolbarActionText}>Add</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default DetailsToolbar;
