import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import SvgUri from "react-native-svg-uri";

// import * as Location from "expo-location";
import wave from "../../Assets/wave.svg";

import Card from "../../componentes/Card";
import api from "../../services/api";

import {
  Container,
  ContainerFlatList,
  ContainerInfo,
  ContainerForecast,
  ContainerMoreInfo,
  ContainerRow,
  NameCity,
  WeatherText,
} from "./styles";

const renderItem = ({ item }) => {
  return <Card data={item} />;
};

function Home() {
  const [refreshing, setRefreshing] = useState(false);

  const [forecast, setForescast] = useState([]);
  const [city, setCity] = useState("Loading");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("Loading");
  const [temp, setTemp] = useState("0");
  const [humidity, setHumidity] = useState("0");
  const [wind, setWind] = useState("0 km/h");
  const [location, setLocation] = useState({
    coords: { latitude: 0, longitude: 0 },
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(1000).then(() => setRefreshing(false));
  }, []);

  function getBackgroundByCondition(condition_slug) {
    switch (condition_slug) {
      case "storm":
        return require("../../Assets/backgroundEight.jpg");

      case "snow":
        return require("../../Assets/backgroundSix.jpg");

      case "hail":
        return require("../../Assets/backgroundNine.jpg");

      case "rain":
        return require("../../Assets/backgroundTen.jpg");

      case "fog":
        return require("../../Assets/backgroundEleven.jpg");

      case "cloud":
        return require("../../Assets/backgroundCatorze.jpg");

      case "cloudly_day":
        return require("../../Assets/backgroundDoze.jpg");

      case "cloudly_night":
        return require("../../Assets/backgroundTreze.jpg");

      case "clear_day":
        return require("../../Assets/backgroundFour.jpg");

      case "clear_night":
        return require("../../Assets/background.jpg");

      case "none_day":
        return require("../../Assets/backgroundDoze.jpg");

      case "none_night":
        return require("../../Assets/backgroundSeven.jpg");

      default:
        return require("../../Assets/backgroundSeven.jpg");
    }
  }

  // verificar se isso realmente é necessário
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      console.log("Chamou");
    })();
  }, []);

  useEffect(() => {
    (async function getData() {
      try {
        const { latitude, longitude } = location.coords;
        const key = "15e39d66";

        let { data } = await api.get(
          `/weather?key=${key}&lat=${latitude}&log=${longitude}&user_ip=remote`
        );

        const {
          city_name,
          condition_slug,
          description,
          forecast,
          humidity,
          temp,
          wind_speedy,
        } = data.results;

        setCity(city_name);
        setCondition(condition_slug);
        setDescription(description);
        setTemp(temp);
        setHumidity(humidity);
        setWind(wind_speedy);
        setForescast(forecast);
      } catch (error) {
        console.log("Houve um erro ao obter os dados");
        console.log(error);
      }
    })();
  }, [location, refreshing]);

  return (
    <Container>
      <ImageBackground
        source={getBackgroundByCondition(condition)}
        style={styles.imageBackground}
      >
        <ScrollView
          style={styles.containerScroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ContainerInfo>
            <WeatherText>{description}</WeatherText>
            <WeatherText fontSize="46">{temp}°C</WeatherText>
            <ContainerMoreInfo>
              <ContainerRow>
                <Icon name="wind" size={20} color="#fff" />
                <WeatherText fontSize="20">{wind}</WeatherText>
              </ContainerRow>
              <ContainerRow>
                <Icon name="water" size={20} color="#fff" />
                <WeatherText fontSize="20">{humidity} %</WeatherText>
              </ContainerRow>
            </ContainerMoreInfo>
          </ContainerInfo>
        </ScrollView>
        <SvgUri width="100%" height="87" source={wave} />
      </ImageBackground>
      <ContainerForecast>
        <NameCity color="#bbb">{city}</NameCity>
        <ContainerFlatList>
          <FlatList
            data={forecast}
            renderItem={renderItem}
            keyExtractor={(item) => item.date}
            horizontal
            showsHorizontalScrollIndicator={true}
          />
        </ContainerFlatList>
      </ContainerForecast>
    </Container>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 6,
    resizeMode: "cover",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
  },
  containerScroll: {
    padding: 0,
  },
});

export default Home;
