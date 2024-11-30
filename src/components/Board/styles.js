import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export default StyleSheet.create({
  board: {
    backgroundColor: colors.postItYellow,
    padding: 15,
    margin: 10,
    borderRadius: 5,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    minWidth: 180,
    minHeight: 150,
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  selectedBoard: {
    backgroundColor: colors.selectedBackground,
  },
  selectionOverlay: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  checkmark: {
    fontSize: 20,
    color: colors.checkmarkColor,
  },
  uncheckedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.checkmarkColor,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
