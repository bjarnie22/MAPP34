import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./styles";

const ChatInterface = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      text: "Hello! I am your assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
    };
    setMessages([...messages, userMessage]);
    setInputText("");

    const API_URL =
      Platform.OS === "android"
        ? "http://10.0.2.2:11434/api/generate"
        : "http://localhost:11434/api/generate";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3.2:latest",
          prompt: inputText,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = {
        id: Date.now().toString(),
        text: data.response,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Fetch error:", error);
      const errorMessage = {
        id: Date.now().toString(),
        text: "Error occurred while fetching the response.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.chatContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatInterface;
