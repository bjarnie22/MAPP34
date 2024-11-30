import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { BoardsProvider } from "../services/BoardsContext";

const Stack = createStackNavigator();

import Main from "../views/Main";
import BoardDetails from "../views/BoardDetails";
import ListDetails from "../views/ListDetails";
import TaskDetails from "../views/TaskDetails";
import FloatingChatButton from "../components/FloatingChatButton";
import ChatInterface from "../components/ChatInterface";

const Routes = () => {
  const [isChatVisible, setChatVisible] = useState(false);

  const toggleChat = () => {
    setChatVisible(!isChatVisible);
  };

  return (
    <BoardsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Your Boards">
          <Stack.Screen name="Your Boards" component={Main} />
          <Stack.Screen name="Board Details" component={BoardDetails} />
          <Stack.Screen name="List Details" component={ListDetails} />
          <Stack.Screen name="Task Details" component={TaskDetails} />
        </Stack.Navigator>
      </NavigationContainer>
      <FloatingChatButton onPress={toggleChat} />
      {isChatVisible && <ChatInterface onClose={toggleChat} />}
    </BoardsProvider>
  );
};

export default Routes;
