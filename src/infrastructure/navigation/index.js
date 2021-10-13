import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";

export const Navigation = () => {
  const { user } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {/* <AccountNavigator /> */}
      {user ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
