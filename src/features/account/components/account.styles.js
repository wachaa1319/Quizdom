import React from "react";

import styled from "styled-components/native";
import { TextInput, Text } from "react-native-paper";
import { Button, Platform, TouchableOpacity } from "react-native";
import AwesomeButtonC from "react-native-really-awesome-button/src/themes/c137";

export const AccountBackground = styled.ImageBackground.attrs({
  // source: require("../../../../assets/splash.png"),
})`
  flex: 1;
  background-color: #fff;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  top: 45%;
  width: 80%;
  height: 30%;
  background-color: rgba(255, 255, 255, 0);
`;

export const Container = styled.View`
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[4]};
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  align-items: center;
  align-self: center;
`;

export const AuthButton = styled(AwesomeButtonC).attrs({
  textFontFamily: "Airstrike",
  textSize: 20,
  // backgroundDarker: "#ff5a5f",
  borderRadius: 10,
})`
  align-self: center;
`;

export const AuthIconButton = styled(AwesomeButtonC).attrs({
  textFontFamily: "Airstrike",
  textSize: 20,
  backgroundColoractivityColor: "#fff",
  backgroundActive: "#f3f3f3",
  backgroundColor: "#fafafa",
  backgroundDarker: "#f2f2f2",
  borderRadius: 10,
})`
  align-self: center;
`;

export const AuthInput = styled(TextInput)`
  ${Platform.OS === "android" ? "width: 250px" : "width: 300px"}
`;

export const BackButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: "5%",
      }}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Text
        style={{
          fontSize: 150,
          fontFamily: "Airstrike",
        }}
      >{`< `}</Text>
    </TouchableOpacity>
  );
};
