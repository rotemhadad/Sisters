import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const circleSize = width / 6;
const colors = ['#C8A2C8', '#ff7f9e', '#89CFF0', '#FF7F50', '#f1f1f1', '#F43169'];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const ColorMatchGame = () => {
  const [targetColor, setTargetColor] = useState(getRandomColor());
  const [circles, setCircles] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds to play

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // End of game
      setScore(0);
      setTimeLeft(30);
      startNewGame();
    }
  }, [timeLeft]);

  const startNewGame = () => {
    const newTargetColor = getRandomColor();
    setTargetColor(newTargetColor);
    generateCircles(newTargetColor);
  };

  const generateCircles = (target) => {
    const newCircles = Array.from({ length: 5 }, () => getRandomColor());
    // Ensure target color is in the circles array
    newCircles.splice(Math.floor(Math.random() * 6), 0, target);
    setCircles(newCircles);
  };

  const handleCirclePress = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setTargetColor(getRandomColor());
    } else {
      setScore(score - 1);
    }
    generateCircles(targetColor);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>משחק התאמת צבעים</Text>
      <Text style={styles.targetText}>התאם את הצבע</Text>
      <View style={[styles.targetCircle, { backgroundColor: targetColor }]} />
      <Text style={styles.score}>ציון: {score}</Text>
      <Text style={styles.timer}>זמן נשאר: {timeLeft}s</Text>
      <View style={styles.circlesContainer}>
        {circles.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.circle, { backgroundColor: color }]}
            onPress={() => handleCirclePress(color)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fffff',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  targetText: {
    fontSize: 18,
    marginBottom: 5,
  },
  targetCircle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
  },
  timer: {
    fontSize: 18,
    marginBottom: 20,
  },
  circlesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    margin: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
});

export default ColorMatchGame;
