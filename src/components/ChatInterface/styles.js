import { StyleSheet } from "react-native";

export default StyleSheet.create({
  chatContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    backgroundColor: "#fff",
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 15,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
  },
  messagesList: {
    flex: 1,
    marginTop: 70,
    paddingHorizontal: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#CCC",
    backgroundColor: "#FFF",
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
