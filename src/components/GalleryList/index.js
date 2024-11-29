import React, { useState, useEffect, useContext } from "react";
import { View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BoardsContext } from "../../services/BoardsContext";
import styles from "./styles";
import Board from "../Board";
import Toolbar from "../Toolbar";
import DetailsToolbar from "../DetailsToolbar";

const GalleryList = () => {
  const { boards, setBoards } = useContext(BoardsContext);
  const [boardName, setBoardName] = useState("");
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedBoards, setSelectedBoards] = useState([]);
  const navigation = useNavigation();

  const addBoard = () => {
    if (boardName.trim() !== "") {
      const newBoard = {
        id: boards.length > 0 ? boards[boards.length - 1].id + 1 : 1,
        name: boardName,
        lists: [],
        thumbnailPhoto: null,
      };
      setBoards([...boards, newBoard]);
      setBoardName("");
    }
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
        boardName={boardName}
        setBoardName={setBoardName}
        onAdd={addBoard}
        selectionMode={selectionMode}
        cancelSelectionMode={cancelSelectionMode}
        deleteSelectedBoards={deleteSelectedBoards}
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
    </View>
  );
};

export default GalleryList;
