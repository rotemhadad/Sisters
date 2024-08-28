import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const numColumns = 4;
const cardSize = width / numColumns - 20;

const emojiSets = [
  ['🐱', '🐶', '🐻', '🐼', '🦁', '🐯', '🦊', '🐰'],
  ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉', '🍑', '🍍'],
  ['🌟', '🌈', '☀️', '❄️', '🌙', '⚡️', '🌊', '🔥'],
];

const MemoryCardGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    startNewGame();
  }, []);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const startNewGame = () => {
    const selectedEmojis = shuffle([...emojiSets[Math.floor(Math.random() * emojiSets.length)]]);
    const shuffledEmojis = shuffle([...selectedEmojis, ...selectedEmojis]);
    setCards(shuffledEmojis.map((emoji, index) => ({ id: index, emoji, flipped: false })));
    setFlippedIndices([]);
    setMatchedIndices([]);
  };

  const onCardPress = (index) => {
    if (flippedIndices.length === 2 || matchedIndices.includes(index)) return;

    setFlippedIndices((prev) => [...prev, index]);
    setCards((prevCards) =>
      prevCards.map((imoji, i) => (i === index ? { ...imoji, flipped: true } : imoji))
    );
  };

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.emoji === secondCard.emoji) {
        setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);
        if (matchedIndices.length + 2 === cards.length) {
          setScore(score + 1);
          setTimeout(startNewGame, 1000);
        }
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((imoji, i) =>
              flippedIndices.includes(i) ? { ...imoji, flipped: false } : imoji
            )
          );
        }, 1000);
      }
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  }, [flippedIndices, cards, matchedIndices, score]);

  const renderCard = ({ item, index }) => {
    const isFlipped = item.flipped || matchedIndices.includes(index);
    return (
      <TouchableOpacity
        style={[styles.imoji, { backgroundColor: isFlipped ? '#ffebcd' : '#ccc' }]}
        onPress={() => onCardPress(index)}
        disabled={isFlipped}
      >
        <Text style={styles.cardText}>{isFlipped ? item.emoji : '?'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>משחק הזיכרון</Text>
      <Text style={styles.score}>ציון: {score}</Text>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
  },
  imoji: {
    backgroundColor:'#C8A2C8',
    width: cardSize,
    height: cardSize,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  cardText: {
    fontSize: 32,
  },
});

export default MemoryCardGame;
