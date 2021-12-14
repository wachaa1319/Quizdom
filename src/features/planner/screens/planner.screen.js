import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import styled, { useTheme } from "styled-components/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { List } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { AddPlanScreen } from "../../../features/planner/screens/add-plan.screen";
import { Button } from "../../../features/planner/components/button.component";
import { shadow } from "../../../components/shadow/shadow.styles";
import { ScrollView } from "react-native-gesture-handler";
import { Row } from "../../../components/utility/row.component";

const PlanningItem = styled(List.Item)`
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[3]};
`;

export const PlannerScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <>
      <Text
        variant="label"
        style={{
          color: "white",
          fontSize: 60,
          paddingHorizontal: 100,
          backgroundColor: "#138000",
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        {"Plan" + " "}
      </Text>
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: "#393939",
          }}
        >
          <Row>
            <View style={{ marginTop: 30, marginLeft: 30 }}>
              <TouchableHighlight
                style={{
                  borderRadius:
                    Math.round(
                      Dimensions.get("window").width +
                        Dimensions.get("window").height
                    ) / 2,
                  width: Dimensions.get("window").width * 0.2,
                  height: Dimensions.get("window").width * 0.2,
                  backgroundColor: "#ffc8ff",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                underlayColor="#ff66c4"
                onPress={() => {
                  console.log("pressed sets plan");
                }}
              >
                <Text style={{ fontSize: 36, color: "white" }}> {"Sets"} </Text>
              </TouchableHighlight>
            </View>

            <View>
              <PlanningItem
                style={{
                  marginTop: 30,
                  marginHorizontal: 30,
                  backgroundColor: "#ffc8ff",
                  borderRadius: 40,
                }}
                titleStyle={{
                  color: "white",
                  fontSize: "20",
                  paddingLeft: 1,
                }}
                title="Start studying : 17/11/21"
              />
            </View>
          </Row>
        </View>
      </ScrollView>
    </>
  );
};
