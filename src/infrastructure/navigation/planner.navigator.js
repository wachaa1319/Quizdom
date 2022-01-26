import React from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { PlannerScreen } from "../../features/planner/screens/planner.screen";
import { AddPlanScreen } from "../../features/planner/screens/add-plan.screen";
import { Button } from "../../features/planner/components/button.component";
import { shadow } from "../../components/shadow/shadow.styles";
import { Text } from "../../components/typography/text.component";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const PlannerStack = createStackNavigator();

export const PlannerNavigator = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const tabHiddenRoutes = ["AddPlanScreen"];
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
    <PlannerStack.Navigator
      initialRouteName="PlannerScreen"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <PlannerStack.Screen
        name="PlannerScreen"
        component={PlannerScreen}
        options={{
          title: "",
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
                {"PLANs" + " "}
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: theme.colors.bg.primary,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            height: 60 + insets.top,
            ...shadow.shadow2,
          },
        }}
      />
      <PlannerStack.Screen
        name="AddPlan"
        component={AddPlanScreen}
        options={{
          gestureResponseDistance: 400,
          headerTransparent: true,
        }}
      />
    </PlannerStack.Navigator>
  );
};
