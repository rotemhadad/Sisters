import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const colors = ['#C8A2C8', '#ff7f9e', '#89CFF0', '#FF7F50', '#f1f1f1', '#F43169'];

const CuteTapGame = () => {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ x: width / 2 - 50, y: height / 2 - 55 }); // Moved 5px up
  const [color, setColor] = useState(colors[0]);

  const handleTap = () => {
    setScore(score + 1);
    setPosition({
      x: Math.random() * (width - 100),
      y: Math.random() * (height - 205), // Account for 5px up and bottom margin
    });
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>ציון: {score}</Text>
      <TouchableOpacity
        style={[styles.character, { left: position.x, top: position.y, backgroundColor: color }]}
        onPress={handleTap}
      >
        <Text style={styles.characterText}>👸🏻</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  character: {
    backgroundColor:'#C8A2C8',
    position: 'absolute',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  characterText: {
    fontSize: 48,
  },
});

export default CuteTapGame;
