import React, { useState, useContext } from "react";
import { View, Text, Image, FlatList } from "react-native";
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
  const navigation = useNavigation();

  if (!board) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Board not found.</Text>
      </View>
    );
  }

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
        deleteSelectedLists={deleteSelectedLists}
      />
      <View style={styles.container}>
        <FlatList
          data={board.lists}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Text style={styles.title}>{board.name}</Text>
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
    </>
  );
};

export default BoardDetails;
