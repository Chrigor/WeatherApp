import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Container, ContainerMaxMin, Text } from "./styles";

const Card = ({ data }) => {
  const { date, weekday, max, min, description, condition, color } = data;

  function getIcon(temp = 0) {
    if (temp < 0) {
      return "snowflake";
    }

    if (temp < 15) {
      return "ice-cream";
    }

    if (temp < 25) {
      return "sun";
    }

    if (temp < 50) {
      return "hotjar";
    }
  }

  return (
    <Container color={color}>
      <View>
        <Text>{weekday}</Text>
        <Text>{date}</Text>
      </View>

      <Text>{description}</Text>

      <ContainerMaxMin>
        <View style={styles.container}>
          <Icon name="sun" size={20} color="red" />
          <Text fontSize="12">{max}°C</Text>
        </View>
        <View style={styles.container}>
          <Icon name="snowflake" size={20} color="#339AF0" />
          <Text fontSize="12">{min}°C</Text>
        </View>
      </ContainerMaxMin>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
});
export default Card;
