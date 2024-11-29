import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export default StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.postItYellow,
  },
  headerContainer: {
    alignItems: "center", 
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    textAlign: "center", 
    marginTop: 20,
  },
  thumbnail: {
    width: "80%",
    height: 200,
    margin: 20,
  },
  modalContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  backgroundColor: "#fff",
  padding: 20,
  borderRadius: 10,
  width: '80%',
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
},
input: {
  borderWidth: 1,
  borderColor: '#ccc',
  padding: 10,
  marginBottom: 10,
  borderRadius: 5,
},

});
