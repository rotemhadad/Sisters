import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';

const apiKey = '';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

const initialContext = [
  {
    role: 'system',
    content: 'שלום, אני אהיה הפסיכולוג האישי שלך, תוכלי לדבר איתי על כל נושא ואנסה לעזור בכל תחום אפשרי!',
  },
];

export default function App() {
  const [context, setContext] = useState(initialContext);
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getCompletion = async (messages) => {
    try {
      const response = await axios.post(apiUrl, {
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7, // Adjust temperature for more empathetic responses
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content;
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      if (error.response) {
        console.error('API Error Response:', error.response.data);
        if (error.response.status === 429) {
          setErrorMessage('גבול טווח השאלות האפשריות, אנא נסי שנית מאוחר יותר.');
        } else if (error.response.status === 402 || error.response.data.error.code === 'insufficient_quota') {
          setErrorMessage('מכסה נגמרה אנא פני למנהלי האפליקציה לפרטים נוספים.');
        } else {
          setErrorMessage(`שגיאה: ${error.response.statusText}`);
        }
      } else {
        setErrorMessage('שגיאת תקשורת.');
      }
      return 'מצטערים, משהו השתבש.';
    }
  };

  const handleChat = async () => {
    if (!input.trim()) {
      setErrorMessage('עלייך להזין טקסט.');
      return;
    }

    const userMessage = { role: 'user', content: input };
    const newContext = [...context, userMessage];
    setContext(newContext);
    setErrorMessage('');  // Clear any previous error message

    const response = await getCompletion(newContext);
    const assistantMessage = { role: 'assistant', content: response };
    setContext([...newContext, assistantMessage]);
    setInput('');
  };

  return (
    <ImageBackground

      source={{ uri: 'https://ml.thcdn.com/productimg/960/960/14869099-1545063637761493.jpg' }}
      style={styles.backgroundImage}
      resizeMode="cover"

    >
      <ScrollView style={styles.conversation}>
        {context.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              message.role === 'user' ? styles.userMessage : styles.assistantMessage,
            ]}
          >
            <Text style={styles.role}>
              {message.role === 'user' ? 'אני' : 'פסיכולוג'}:
            </Text>
            <Text>{message.content}</Text>
          </View>
        ))}
        {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="שתפי את מחשבותייך..."
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleChat}>
        <Text style={styles.buttonText}>שלח</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    direction: 'rtl', // RTL support
    textAlign: 'right',
  },
  conversation: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'right',
  },
  message: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
    direction: 'rtl', // RTL support
    textAlign: 'right',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 5,
  },
  userMessage: {
    textAlign: 'right',
    backgroundColor: '#C8A2C8', // lilac color for user
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 5,
  },
  assistantMessage: {
    textAlign: 'right',
    backgroundColor: '#89CFF0', // Blue color for assistant
    alignSelf: 'flex-start',
  },
  role: {
    textAlign: 'right',
    fontWeight: 'bold',
    direction: 'rtl', // RTL support
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    textAlign: 'right', // Align text to the right
  },
  button: {
    backgroundColor: '#ff7f9e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    direction: 'rtl', // RTL support
  },
});
