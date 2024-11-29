import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const DetailsToolbar = ({
  selectionMode,
  selectedCount,
  cancelSelectionMode,
  deleteSelectedItems,
  onEdit,
  onAdd,
  title,
  showEdit = true, 
  showAdd = true,
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
          <Text style={styles.toolbarTitle}>{selectedCount} Selected</Text>
          <TouchableOpacity
            onPress={deleteSelectedItems}
            style={styles.toolbarAction}
          >
            <Text style={styles.toolbarActionText}>Delete</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {showEdit && (
            <TouchableOpacity
              onPress={onEdit}
              style={styles.toolbarAction}
            >
              <Text style={styles.toolbarActionText}>Edit</Text>
            </TouchableOpacity>
          )}
          {showAdd && (
          <>
          <Text style={styles.toolbarTitle}>{title}</Text>
          <TouchableOpacity
            onPress={onAdd}
            style={styles.toolbarAction}
          >
            <Text style={styles.toolbarActionText}>Add</Text>
          </TouchableOpacity>
          </>
          )}
        </>
      )}
    </View>
  );
};

export default DetailsToolbar;
