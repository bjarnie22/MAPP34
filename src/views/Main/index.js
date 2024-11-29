import { View } from "react-native";
import styles from "./styles";
import GalleryList from "../../components/GalleryList";

const Main = () => {
  return (
    <View style={styles.container}>
      <GalleryList />
    </View>
  );
};

export default Main;
