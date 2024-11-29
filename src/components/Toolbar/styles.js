import { StyleSheet } from 'react-native';
import { colors } from "../../styles/colors";

export default StyleSheet.create({
    toolbar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', 
      height: 80,
      backgroundColor: colors.nordicBlue,
      paddingHorizontal: 16, 
    },
    toolbarTitle: {
      flex: 1, 
      fontSize: 18,
      color: 'white',
    },
    toolbarAction: {
      flexShrink: 0, 
      alignItems: 'center', 
      justifyContent: 'center',
    },
    toolbarActionText: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 16,
    },
  });
  
