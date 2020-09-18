import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, ImageBackground, StyleSheet } from "react-native";

import Routes from "./src/routes";

export default function App() {
  return (
    <SafeAreaView
      style={styles.container}
      translucent={true}
      backgroundColor={"transparent"}
    >
      <StatusBar style="light" />
      <Routes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
