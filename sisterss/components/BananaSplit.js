import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const gameDuration = 30000; // 30 seconds
const moleSize = 80;

const WhackAMoleGame = () => {
  const [molePosition, setMolePosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(gameDuration / 1000);

  useEffect(() => {
    let gameTimer;
    let moleTimer;

    if (!gameOver) {
      gameTimer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(gameTimer);
            setGameOver(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      moleTimer = setInterval(() => {
        setMolePosition({
          x: Math.random() * (width - moleSize),
          y: Math.random() * (height - moleSize - 100), // Adjust for screen margins
        });
      }, 800); // Moles appear every 800ms
    }

    return () => {
      clearInterval(gameTimer);
      clearInterval(moleTimer);
    };
  }, [gameOver]);

  const handleMolePress = () => {
    if (!gameOver) {
      setScore(score + 1);
      setMolePosition({
        x: Math.random() * (width - moleSize),
        y: Math.random() * (height - moleSize - 100),
      });
    }
  };

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    setTimeLeft(gameDuration / 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>ציון: {score}</Text>
      <Text style={styles.timerText}>זמן נותר: {timeLeft}s</Text>
      {!gameOver ? (
        <TouchableOpacity
          style={[styles.mole, { top: molePosition.y, left: molePosition.x }]}
          onPress={handleMolePress}
        />
      ) : (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>משחק נגמר!</Text>
          <Text style={styles.finalScoreText}>הציון שלך: {score}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
            <Text style={styles.restartButtonText}>התחל מהתחלה</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: 40,
  },
  timerText: {
    fontSize: 24,
    position: 'absolute',
    top: 80,
  },
  mole: {
    position: 'absolute',
    width: moleSize,
    height: moleSize,
    backgroundColor: '#C8A2C8',
    borderRadius: 50,
  },
  gameOverContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF7F50',
  },
  finalScoreText: {
    fontSize: 24,
    marginVertical: 20,
  },
  restartButton: {
    backgroundColor: '#ff7f9e',
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 7, 
    elevation: 5, 
  },
  restartButtonText: {
    color: '#fff',
    fontWeight:'bold',
    fontSize: 18,
  },
});

export default WhackAMoleGame;
