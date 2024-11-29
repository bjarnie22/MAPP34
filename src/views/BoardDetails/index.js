import React, { useState, useContext } from "react";
import { View, Text, Image, FlatList, Modal, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BoardsContext } from "../../services/BoardsContext"; 
import DetailsToolbar from "../../components/DetailsToolbar";
import List from "../../components/List";
import styles from "./styles";

const BoardDetails = ({ route }) => {
  const { boards, setBoards } = useContext(BoardsContext);
  const { boardId } = route.params;
  const board = boards.find((b) => b.id === boardId);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedLists, setSelectedLists] = useState([]);

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedName, setEditedName] = useState(board.name);
  const [editedThumbnail, setEditedThumbnail] = useState(board.thumbnailPhoto);

  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListColor, setNewListColor] = useState("#ffffff");
  const navigation = useNavigation();

  if (!board) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Board not found.</Text>
      </View>
    );
  }

  const handleEdit = () => {
    setEditedName(board.name);
    setEditedThumbnail(board.thumbnailPhoto);
    setEditModalVisible(true);
  };

  const saveEditedBoard = () => {
    const updatedBoards = boards.map((b) =>
      b.id === boardId ? { ...b, name: editedName, thumbnailPhoto: editedThumbnail } : b
    );
    setBoards(updatedBoards);
    setEditModalVisible(false);
  };

  const handleAdd = () => {
    setAddModalVisible(true);
  };

  const addList = () => {
    if (newListName.trim() !== "") {
      const newList = {
        id: board.lists.length + 100,
        name: newListName,
        color: newListColor,
        tasks: [],
      };
      const updatedLists = [...board.lists, newList];
      const updatedBoards = boards.map((b) => {
        if (b.id === boardId) {
          return { ...b, lists: updatedLists };
        }
        return b;
      });
      setBoards(updatedBoards);
      setNewListName("");
      setNewListColor("#ffffff");
      setAddModalVisible(false);
    }
  };


  const handleListPress = (list) => {
    if (selectionMode) {
      if (selectedLists.includes(list.id)) {
        setSelectedLists(selectedLists.filter((listId) => listId !== list.id));
      } else {
        setSelectedLists([...selectedLists, list.id]);
      }
    } else {
      navigation.navigate("List Details", { boardId: board.id, listId: list.id });
    }
  };

  const handleListLongPress = (id) => {
    setSelectionMode(true);
    setSelectedLists([id]);
  };

  const deleteSelectedLists = () => {
    const updatedLists = board.lists.filter(
      (list) => !selectedLists.includes(list.id)
    );

    const updatedBoards = boards.map((b) => {
      if (b.id === boardId) {
        return { ...b, lists: updatedLists };
      }
      return b;
    });

    setBoards(updatedBoards);
    setSelectionMode(false);
    setSelectedLists([]);
  };

  const cancelSelectionMode = () => {
    setSelectionMode(false);
    setSelectedLists([]);
  };

  return (
    <>
      <DetailsToolbar
        selectionMode={selectionMode}
        selectedCount={selectedLists.length}
        cancelSelectionMode={cancelSelectionMode}
        deleteSelectedItems={deleteSelectedLists}
        onEdit={handleEdit}
        onAdd={handleAdd}
        title={board.name}
      />
      <View style={styles.container}>
        <FlatList
          data={board.lists}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: board.thumbnailPhoto }}
                style={styles.thumbnail}
              />
            </View>
          }
          renderItem={({ item }) => (
            <List
              list={item}
              selectionMode={selectionMode}
              isSelected={selectedLists.includes(item.id)}
              onPress={handleListPress}
              onLongPress={handleListLongPress}
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
            <Text style={styles.modalTitle}>Edit Board</Text>
            <TextInput
              style={styles.input}
              value={editedName}
              onChangeText={setEditedName}
            />
            <TextInput
              style={styles.input}
              value={editedThumbnail}
              onChangeText={setEditedThumbnail}
            />
            <Button title="Save" onPress={saveEditedBoard} />
            <Button
              title="Cancel"
              onPress={() => setEditModalVisible(false)}
            />
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
            <Text style={styles.modalTitle}>Add List</Text>
            <TextInput
              style={styles.input}
              value={newListName}
              onChangeText={setNewListName}
            />
            <TextInput
              style={styles.input}
              value={newListColor}
              onChangeText={setNewListColor}
            />
            <Button title="Save" onPress={addList} />
            <Button
              title="Cancel"
              onPress={() => setAddModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default BoardDetails;
