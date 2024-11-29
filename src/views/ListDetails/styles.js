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
});