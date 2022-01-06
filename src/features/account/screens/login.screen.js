import React, { useState, useContext } from "react";
import { Text } from "../../../components/typography/text.component";
import { TextInput } from "react-native-paper";
import styled, { useTheme } from "styled-components/native";

import {
  AccountBackground,
  AccountCover,
  Container,
  TContainer,
  AuthButton,
  AuthIconButton,
  DescText,
  LogoText,
  AuthLogo,
  AuthInput,
  // BackButton,
  TouchableWithoutFeedback,
} from "../components/account.styles";
import { BackButton } from "../../../components/button/back-button.component";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Logo } from "../../../../assets/logo";

const Center = styled.View`
  /* top: 10%; */
`;

// const TContainerII = styled(TContainer)`
//   top: 50%;
// `;

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
    >
      <AccountBackground>
        <BackButton navigation={navigation} />
        <AuthLogo />
        {/* <Text
          style={{
            fontSize: 20,
            color: "#fff",
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          Let's adventure together
        </Text> */}
        {/* <DescText>Let's adventure together.</DescText> */}
        <TContainer>
          {/* <LogoText>Quizdom </LogoText> */}
          {error && (
            <Spacer position="bottom" size="medium">
              <Text variant="error">{error}</Text>
            </Spacer>
          )}
          <Center>
            <Text
              style={{
                color: "white",
                fontSize: 30,
                alignSelf: "flex-start",
                marginBottom: 20,
              }}
            >
              Log in
            </Text>
            <AuthInput
              label="Email"
              value={email}
              textContentType="emailAddress"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />
            <Spacer size="large" />
            <AuthInput
              label="Password"
              value={password}
              textContentType="password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Spacer size="large" />
            {!isLoading ? (
              <AuthButton
                type="primary"
                size="large"
                onPress={() => {
                  console.log(email, password);
                  onLogin(email, password);
                  console.log(error);
                }}
              >
                Login
              </AuthButton>
            ) : (
              <ActivityIndicator animating={true} color="#7ed957" />
            )}
          </Center>
        </TContainer>

        {/*
        <View
          style={{
            // backgroundColor: "#232",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            top: "0%",
          }}
        >
          <Logo />
        </View>
        */}
        {/*<LogoImage
                source={require("../../../../assets/chandy.png")}
        />*/}

        {/* <Spacer size="large" />
        <Spacer size="large" />
        <AuthButton
          type="secondary"
          size="medium"
          onPress={() => {
            navigation.goBack();
          }}
        >
          Back
        </AuthButton> */}
      </AccountBackground>
    </KeyboardAvoidingView>
  );
};
