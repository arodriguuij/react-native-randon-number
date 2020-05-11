import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Color from "../constants/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Color.secondary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  number: {
    fontSize: 22,
    color: Colors.secondary,
  },
});

export default NumberContainer;
