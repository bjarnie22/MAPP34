import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const FloatingChatButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <Icon name="chat" size={30} color="#fff" />
    </TouchableOpacity>
  );
};



export default FloatingChatButton;
