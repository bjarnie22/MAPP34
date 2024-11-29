import React, { useState, useContext } from "react";
import { View, FlatList, Modal, TextInput, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BoardsContext } from "../../services/BoardsContext";
import styles from "./styles";
import Board from "../Board";
import DetailsToolbar from "../DetailsToolbar";

const GalleryList = () => {
  const { boards, setBoards } = useContext(BoardsContext);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedBoards, setSelectedBoards] = useState([]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const navigation = useNavigation();
  const [newThumbnailPhoto, setNewThumbnailPhoto] = useState(null);

  const addBoard = () => {
    if (newBoardName.trim() !== "") {
      const newBoard = {
        id: boards.length + 1,
        name: newBoardName,
        lists: [],
        thumbnailPhoto: newThumbnailPhoto,
      };
      setBoards([...boards, newBoard]);
      setNewBoardName("");
      setNewThumbnailPhoto(null);
      setAddModalVisible(false);
    }
  };

  const handleAdd = () => {
    setNewBoardName('');
    setAddModalVisible(true);
  };

  const handleBoardLongPress = (id) => {
    setSelectionMode(true);
    setSelectedBoards([id]);
  };

  const handleBoardPress = (board) => {
    if (selectionMode) {
      if (selectedBoards.includes(board.id)) {
        setSelectedBoards(
          selectedBoards.filter((boardId) => boardId !== board.id)
        );
      } else {
        setSelectedBoards([...selectedBoards, board.id]);
      }
    } else {
      navigation.navigate("Board Details", { boardId: board.id });
    }
  };

  const cancelSelectionMode = () => {
    setSelectionMode(false);
    setSelectedBoards([]);
  };

  const deleteSelectedBoards = () => {
    const newBoards = boards.filter(
      (item) => !selectedBoards.includes(item.id)
    );
    setBoards(newBoards);
    setSelectionMode(false);
    setSelectedBoards([]);
  };

  return (
    <View style={styles.container}>
      <DetailsToolbar
        onAdd={handleAdd}
        selectionMode={selectionMode}
        cancelSelectionMode={cancelSelectionMode}
        deleteSelectedItems={deleteSelectedBoards}
        selectedCount={selectedBoards.length}
        title="Your Boards"
        showEdit={false}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          numColumns={2}
          data={boards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Board
              board={item}
              selectionMode={selectionMode}
              isSelected={selectedBoards.includes(item.id)}
              onPress={() => handleBoardPress(item)}
              onLongPress={() => handleBoardLongPress(item.id)}
            />
          )}
        />
      </View>

      {/* Add Modal */}
      <Modal
        visible={isAddModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Board</Text>
            <TextInput
              style={styles.input}
              value={newBoardName}
              onChangeText={setNewBoardName}
              placeholder="Board Name"
            />
            <TextInput
              style={styles.input}
              value={newThumbnailPhoto}
              onChangeText={setNewThumbnailPhoto}
              placeholder="Link to Thumbnail Photo"
            />
            <Button title="Add" onPress={addBoard} />
            <Button
              title="Cancel"
              onPress={() => setAddModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GalleryList;
