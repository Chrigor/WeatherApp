import styled from "styled-components/native";
import { StatusBar } from "react-native";

const heightStatusBar = StatusBar.currentHeight;

export const Container = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: #ddd;
  
  padding:0;
  margin:0;
  border:none;
`;

export const ContainerForecast = styled.View`
  flex: 4;
  background: #fff;
  align-items: center;
  height: 100%;
`;

export const ContainerInfo = styled.View`
  flex: 1;
  align-items: center;
  margin-top: ${heightStatusBar + 82}px;
`;

export const ContainerFlatList = styled.SafeAreaView`
  margin: 8px 0px;
  height: 100%;
  width: 100%;

  justify-content: center;
  align-items: center;
`;

export const WeatherText = styled.Text`
  font-size: ${(props) => (props.fontSize ? props.fontSize + "px" : "26px")};
  color: #fff;
  font-weight: bold;
  margin: 0px 6px;
`;

export const NameCity = styled.Text`
  font-size: 32px;
  color: ${(props) => (props.color ? props.color : "#eee")};
  font-weight: 600;
  text-align: center;
`;

export const ContainerMoreInfo = styled.View`
  width: 70%;

  flex-direction: row;
  justify-content: space-around;

  margin-top: 16px;
`;

export const ContainerRow = styled.View`
  flex-direction: row;
  align-items: center;
`;
