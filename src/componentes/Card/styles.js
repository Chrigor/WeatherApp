import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;

  justify-content: space-around;
  height: 220px;
  width: 150px;

  border: 1px solid #ddd;
  border-radius: 10px;

  padding: 4px;
  margin: 16px 8px;

  background-color: ${(props) => (props.color ? props.color : "#fff")};
`;

export const ContainerMaxMin = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const Text = styled.Text`
  text-align: center;
  width: 100%;
  font-size: ${(props) => (props.fontSize ? props.fontSize + "px" : "14px")};
  color: #aaa;
  margin: 4px 0px;
`;
