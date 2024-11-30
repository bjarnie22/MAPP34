import { StyleSheet } from "react-native";

export default StyleSheet.create({
  taskContainer: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  selectedTask: {
    backgroundColor: "#e0e0e0",
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskNameCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  taskDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  taskDescriptionCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  checkmarkIcon: {
    marginRight: 10,
  },
  checkboxContainer: {
    padding: 0,
    margin: 0,
    marginRight: 10,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
});
