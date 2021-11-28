import React from "react";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { UserScreen } from "../../features/user/screens/user.screen";
import { AchievementScreen } from "../../features/user/screens/achievement.screen";
import { LeaderboardScreen } from "../../features/user/screens/leaderboard.screen";
import { FriendsScreen } from "../../features/user/screens/friends.screen";
import { EditUserInfoScreen } from "../../features/user-info/screens/user-info.screen";
import { UserProfileScreen } from "../../features/user/screens/user-profile.screen";
import { StatsScreen } from "../../features/user/screens/stats.screen";
// import { UserInfoContextProvider } from "../../services/user-info/user-info.context";

const UserStack = createStackNavigator();

export const UserNavigator = ({ route, navigation }) => {
  return (
    // <UserInfoContextProvider>
    <UserStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: {
          backgroundColor: "#33363d",
        },
      }}
    >
      <UserStack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      />
      <UserStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      />
      <UserStack.Screen
        name="AchievementScreen"
        component={AchievementScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      />
      <UserStack.Screen
        name="FriendsScreen"
        component={FriendsScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      />
      <UserStack.Screen
        name="LeaderboardScreen"
        component={LeaderboardScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      />
      <UserStack.Screen
        name="StatsScreen"
        component={StatsScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      />
      <UserStack.Screen
        options={{ headerShown: false }}
        name="EditUserInfoScreen"
        component={EditUserInfoScreen}
      />
      {/* <SettingsStack.Screen name="EditUser" component={FavouritesScreen} /> */}
    </UserStack.Navigator>
    // </UserInfoContextProvider>
  );
};
