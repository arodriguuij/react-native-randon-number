import React from "react";
import { StyleSheet, View, Button, Image, Text } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = ({ roundsNumber, userNumber, onNewGame }) => {
  return (
    <View style={styles.container}>
      <TitleText>The Game is over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/success.png")}
          /*           source={{uri: 'https://www.roughguides.com/wp-content/uploads/2016/02/matterhorn-shutterstock_1118486243.jpg'}}
           */ style={styles.image}
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to guess the number:{" "}
          <Text style={styles.highlight}>{userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onPress={onNewGame}>NEW GAME</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: "black",
    borderWidth: 3,
    overflow: "hidden",
  },
  resultContainer: {
    marginVertical: 30,
    marginHorizontal: 15,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
  resultText: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default GameOverScreen;
