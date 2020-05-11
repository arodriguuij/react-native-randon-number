import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItems}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHight = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [pastGuesses, userChoice, currentGuess]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHight.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHight.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((currentPassGuesses) => [
      nextNumber.toString(),
      ...currentPassGuesses,
    ]);
  };

  return (
    <View style={styles.container}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonsContainer}>
        <View style={styles.button}>
          <MainButton onPress={() => nextGuessHandler("lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.button}>
          <MainButton onPress={() => nextGuessHandler("greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={pastGuesses}
          keyExtractor={(guess) => guess}
          renderItem={({ item, index }) =>
            renderListItem(item, pastGuesses.length - index)
          }
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 400,
    maxWidth: "90%",
  },
  listItems: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  list: {
    justifyContent: "flex-end",
    flexGrow: 1,
  },
  listContainer: {
    width: "60%",
    flex: 1,
  },
});

export default GameScreen;
