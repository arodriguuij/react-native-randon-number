import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./src/components/Header";
import StartGameScreen from "./src/screens/StartGameScreen";
import GameScreen from "./src/screens/GameScreen";
import GameOverScreen from "./src/screens/GameOverScree";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () =>
  Font.loadAsync({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGamehandler = () => {
    setUserNumber();
    setGuessRounds(0);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = (numOfRound) => {
    setGuessRounds(numOfRound);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  
  if (userNumber && guessRounds <= 0)
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onNewGame={configureNewGamehandler}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
