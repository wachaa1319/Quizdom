import React, { useEffect } from "react";
import { View, Platform, Text } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { HomeScreen } from "../../features/home/screens/home.screen";
import { SetMapScreen } from "../../features/map/screens/sets/set-map.screen";
import { Ionicons } from "@expo/vector-icons";

import { AddButton } from "../../features/home/components/buttons/add-button.component";
import { UserButton } from "../../features/home/components/buttons/setting-button.component";
//import { ProfileButton } from "../../features/home/components/buttons/profile-button.component";
import { shadow } from "../../components/shadow/shadow.styles";
import { MapNavigator } from "./map.navigation";
import { QuizNavigator } from "./quiz.navigation.js";
import { StatusBar } from "expo-status-bar";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InequalitiesMapScreen from "../../features/map/screens/inequalities-map.screen";

import { useTheme } from "styled-components/native";
import {
  SET_MAP_NAVIGATION_NAME,
  SET_MAP_START_NAME,
} from "../constants/navigation";
import { SetMapStartScreen } from "../../features/map/screens/sets/set-map-start.screen";

const HomeStack = createStackNavigator();

export const HomeNavigator = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const tabHiddenRoutes = [
    SET_MAP_NAVIGATION_NAME,
    SET_MAP_START_NAME,
    "QuizNavigator",
  ];
  const theme = useTheme();
  React.useLayoutEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          backgroundColor: theme.colors.bg.secondary, // for home screen exception
          bottom: 0,
          borderTopColor: "transparent",
          overflow: "hidden",
        },
      });
    }
  }, [navigation, route]);
  return (
    <>
      <HomeStack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={
          {
            // ...TransitionPresets.SlideFromRightIOS,
          }
        }
      >
        <HomeStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "",
            headerRight: () => <UserButton navigation={navigation} />,
            //headerLeft: () => <AddButton navigation={navigation} />,
            headerTransparent: true,
            headerBackground: () => (
              <View
                style={{
                  height:
                    Platform.OS === "ios" ? 50 + insets.top : 50 + insets.top, //was 120 Android
                  backgroundColor: theme.colors.bg.secondary, //coloradded
                  borderBottomRightRadius: 30,
                  borderBottomLeftRadius: 30,
                  ...shadow.shadow2,
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Airstrike",
                    marginTop: insets.top - 5,
                    fontSize: 47,
                    color: "#fff",
                  }}
                >
                  {"Quizdom" + " "}
                </Text>
              </View>
            ),
          }}
        />
        <HomeStack.Screen
          name={SET_MAP_NAVIGATION_NAME}
          component={SetMapScreen}
          navigation={navigation}
          options={{
            headerShown: false,
          }}
        />
        <HomeStack.Screen
          name={SET_MAP_START_NAME}
          component={SetMapStartScreen}
          navigation={navigation}
          options={{
            gestureResponseDistance: 800,
            cardStyle: {
              backgroundColor: "#33363d",
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
              margin: 20,
              marginBottom: 50,
            },
            headerShown: false,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <HomeStack.Group
          screenOptions={
            {
              // presentation: "transparentModal",
              // ...TransitionPresets.ModalSlideFromBottomIOS,
            }
          }
        >
          <HomeStack.Screen
            name="QuizNavigator"
            component={QuizNavigator}
            options={{
              gestureEnabled: false,
              headerShown: false,
              gestureResponseDistance: 500,
              // ...TransitionPresets.ModalTransition,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        </HomeStack.Group>
      </HomeStack.Navigator>
      <StatusBar style="auto" />
    </>
  );
};
