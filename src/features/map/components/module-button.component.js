import React, { useContext, useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";
import { Text } from "../../../components/typography/text.component";
import CircularProgress, {
  CircularProgressWithChild,
} from "react-native-circular-progress-indicator";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  ZoomIn,
} from "react-native-reanimated";
import { MapsContext } from "../../../services/maps/maps.context";
import { shadow } from "../../../components/shadow/shadow.styles";

class Donut extends React.Component {
  render() {
    return (
      <CircularProgressWithChild
        activeStrokeColor={"#467dff"}
        activeStrokeSecondaryColor={"#b535ff"}
        activeStrokeWidth={25}
        inActiveStrokeWidth={25}
        value={
          this.props.progress > 0 && this.props.timeProgress > 0
            ? this.props.timeProgress
            : 0
        }
        radius={this.props.radius}
        showProgressValue={false}
      >
        {this.props.children}
      </CircularProgressWithChild>
    );
  }
}

const AnimatedDonut = Animated.createAnimatedComponent(Donut);

export function ModuleButton({
  color,
  position,
  started,
  completedAt,
  latestAt,
  startedAt,
  reviewAt,
  name,
  style,
  value,
  id,
  translateY,
  progress,
  unlocked,
  scrollTo,
}) {
  const { height, width } = Dimensions.get("window");
  const top = position.top;
  const left = position.left;
  const { setSelectedModule, selectedMapModulesData, updated, selectedModule } =
    useContext(MapsContext);
  const [timeProgress, setTimeProgress] = useState(0);
  const donutRadius = useSharedValue(60);

  const radiusProps = useAnimatedProps(() => ({
    radius: donutRadius.value,
  }));

  useEffect(() => {
    if (started && progress) {
      const interval = setInterval(() => {
        const limitHrs = (reviewAt.seconds - latestAt.seconds) / 60 / 60;
        const nowAt = new Date().getTime() / 1000;
        const nowHrs = nowAt / 60 / 60;
        const passedHrs = nowHrs - latestAt.seconds / 60 / 60;
        setTimeProgress(100 - (passedHrs / limitHrs) * 100);
      }, 1000);
      return () => clearInterval(interval);
    }
    console.log(updated);
  }, [updated]);

  // useEffect(() => {
  //   selectedModule
  //     ? selectedModule.name === module.name
  //       ? (donutRadius.value = withSpring(80))
  //       : (donutRadius.value = withSpring(60))
  //     : (donutRadius.value = withSpring(60));
  // }, [selectedModule]);

  const module = {
    name,
    id,
    unlocked,
  };

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(translateY.value - top - 100),
      [0, height / 2, height],
      [0.5, 1.2, 0.5],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View
      entering={ZoomIn}
      style={[
        {
          position: "absolute",
          backgroundColor: color,
          top: top,
          left: left,
          width: 70,
          height: 70,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          ...style,
        },
        rStyle,
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          scrollTo(top - 200);
          donutRadius.value = withSpring(80);
          if (!started) {
            const module = selectedMapModulesData.find(
              (module) => module.id === id
            );

            setSelectedModule(module);
            return;
          }
          setSelectedModule(module);
        }}
      >
        <AnimatedDonut
          progress={progress}
          timeProgress={timeProgress}
          // animatedProps={radiusProps}
          radius={
            selectedModule
              ? selectedModule.name === module.name
                ? (donutRadius.value = 80)
                : (donutRadius.value = 60)
              : (donutRadius.value = 60)
          }
          // circleBackgroundColor={"#76ffc6"}
        >
          <View
            style={{
              backgroundColor: unlocked
                ? progress === 0
                  ? "#fff492"
                  : progress === 1
                  ? "#ffa9e9"
                  : progress === 2
                  ? "#5cffc9"
                  : progress === 3
                  ? "#91ff76"
                  : "#ffd700"
                : "grey",
              borderRadius: 100,
              width: selectedModule
                ? selectedModule.name === module.name
                  ? 65
                  : 60
                : 60,
              height: selectedModule
                ? selectedModule.name === module.name
                  ? 65
                  : 60
                : 60,
              justifyContent: "center",
              alignItems: "center",
              // progress > 0 ? ...shadow.shadow2 : ...shadow.glowRed,
            }}
          >
            <Text
              variant="label"
              style={{
                fontSize: 36,
                marginLeft: 5,
                zIndex: 100,
              }}
            >
              {progress + " "}
            </Text>
          </View>
        </AnimatedDonut>
        <View
          style={{
            position: "absolute",
            left: left + 60 < width / 2 ? 120 : -110,
            // backgroundColor: "#00000033",
            borderRadius: 15,
            padding: 10,
            top: 20,
            width: 150,
            zIndex: 10,
          }}
        >
          <Text
            adjustsFontSizeToFit
            style={{
              fontSize: 20,
              color: "#fff",
              color: "white",
              ...shadow.shadow3,
            }}
          >
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
// }
