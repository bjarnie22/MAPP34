import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";

const Board = ({ board, selectionMode, isSelected, onPress, onLongPress }) => {
  return (
    <TouchableOpacity
      style={[styles.board, isSelected && styles.selectedBoard]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {selectionMode && (
        <View style={styles.selectionOverlay}>
          {isSelected ? (
            <Text style={styles.checkmark}>✓</Text>
          ) : (
            <View style={styles.uncheckedCircle} />
          )}
        </View>
      )}
      <Text style={styles.name}>{board.name}</Text>
      <Image source={{ uri: board.thumbnailPhoto }} style={styles.thumbnail} />
    </TouchableOpacity>
  );
};

export default Board;
