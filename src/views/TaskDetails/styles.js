import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  taskDetailsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  completionIcon: {
    marginBottom: 20,
  },
  taskName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  taskNameCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  taskDescription: {
    fontSize: 18,
    marginTop: 10,
  },
  taskDescriptionCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
