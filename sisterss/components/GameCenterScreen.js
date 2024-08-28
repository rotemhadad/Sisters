import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const arcadeImages = [
  'https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
  'https://png.pngtree.com/background/20230426/original/pngtree-arcade-games-line-the-hallway-in-this-space-picture-image_2481217.jpg',
  'https://moewalls.com/wp-content/uploads/2023/03/retro-boy-late-night-arcade-thumb-364x205.jpg',
];

const GameCenter = ({ navigation }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % arcadeImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(imageInterval);
  }, []);

  const navigateToGame = (gameName) => {
    navigation.navigate(gameName);
  };

  return (
    <ImageBackground
      source={{ uri: arcadeImages[currentImageIndex] }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>מרכז משחקים</Text>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('משחק לחיצה')}>
           
            <Text style={styles.buttonText}>משחק בקליק</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('משחק זיכרון')}>
          
            <Text style={styles.buttonText}>משחק זיכרון</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('משחק צבעים')}>
          
          <Text style={styles.buttonText}>משחק צבעים</Text>

        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('משחק הכה בחפרפרת')}>
          
          <Text style={styles.buttonText}>משחק הכה בחפרפרפת</Text>
      </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  buttonContainer: {
    width: '80%',
  },
  gameButton: {
    backgroundColor: '#ff6b6b',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameCenter;