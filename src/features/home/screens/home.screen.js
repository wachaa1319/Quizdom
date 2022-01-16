import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { shadow } from "../../../components/shadow/shadow.styles";
import { Text } from "../../../components/typography/text.component";
import { Today } from "../components/today/today.component";
import { Maps } from "../components/maps.component";
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { StatusBar } from "expo-status-bar";
import {
  TitleText,
  HomeBackground,
  TitleContainer,
} from "../components/home.styles";
import { useTheme } from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withRepeat,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { SET_MAP_NAVIGATION_NAME } from "../../../infrastructure/constants/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { MapsContext } from "../../../services/maps/maps.context";
// import MathView, { MathText } from "react-native-math-view";
import MathView, { MathText } from "react-native-math-view/src/fallback";

const SIZE = 100;

// const handleRotation = (progress) => {
//   "worklet";
//   return `${progress.value * Math.PI * 2}rad`;
// };

export const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const { onLogout } = useContext(AuthenticationContext);
  const { mapsData } = useContext(MapsContext);
  const [maps, setMaps] = useState([
    {
      name: "sets",
      navigateName: SET_MAP_NAVIGATION_NAME,
      id: 0,
      progress: "3",
      modulesCount: 9,
      isStarted: true,
      isPaused: false,
      image: require("../../../../assets/maps-image/setsmapimg.png"),
    },
  ]);
  const onAddQuiz = () => {
    const quizzes = [
      {
        answer1: `{telephone, camera, computer, coffee, tea}`,
        answer2: `$\\varnothing$`,
        answer3: `{telephone, camera, computer}`,
        answer4: `{notebook, computer, coffee}`,
        correct_answer: 1,
        explaination: `$B=\\text{{textbook, notebook, calculator, desk}}$`,
        hint: `$'$ means complement`,
        image: `https://study.com/cimages/multimages/16/1490086260_p3.png`,
        source: `https://study.com/academy/practice/quiz-worksheet-venn-diagrams.html`,
        question: `Use the Venn Diagram.`,
        skillLevel: 1,
        tags: ["sets", "Venn Diagram"],
      },
      {
        answer1: `Set A = {2, 5, 11, 12}`,
        answer2: `Set A = {2, 3, 4, 5, 6, 7, 11, 12}`,
        answer3: `Set A = {1, 3, 4, 6, 7, 10, 13, 14, 15}`,
        answer4: `Set A = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15}`,
        correct_answer: 2,
        explaination: `every number in the circle A should be in the set`,
        hint: `which circle is the set A?`,
        image: `https://bam.files.bbci.co.uk/bam/live/content/z3942p3/small`,
        source: `https://www.bbc.co.uk/bitesize/guides/zt7rk7h/test`,
        question: `Which elements are contained within set A?`,
        skillLevel: 1,
        tags: ["sets", "Venn Diagram"],
      },
      {
        answer1: `{$8,9,10,11,12,13,14,15$}`,
        answer2: `{$2, 5, 11, 12$}`,
        answer3: `{$3, 7, 6, 4$}`,
        answer4: `{$8,9$}`,
        correct_answer: 4,
        explaination: `{8, 9} is the correct answer. You should have found all the items that were outside the two circles. You have found the items that are in set B but not set A.`,
        hint: `which circle is the set A?`,
        image: `https://bam.files.bbci.co.uk/bam/live/content/z3942p3/small`,
        source: `https://www.bbc.co.uk/bitesize/guides/zt7rk7h/test`,
        question: `Which items are not in either set A or set B?`,
        skillLevel: 1,
        tags: ["sets", "Venn Diagram"],
      },
      {
        answer1: `34 visitors`,
        answer2: `38 visitors`,
        answer3: `30 visitors`,
        answer4: `72 visitors`,
        correct_answer: 1,
        explaination: `You need to add 8 into the intersection of all the circles, then find the total of the values in the circle for the National Library of Wales and deduct this from the total number of visitors to the National Library of Wales.`,
        hint: `which part of the diagram does the answer go in?`,
        image: `https://bam.files.bbci.co.uk/bam/live/content/zw6xv4j/small`,
        source: `https://www.bbc.co.uk/bitesize/guides/zt7rk7h/test`,
        question: `A survey was carried out on 150 tourists to Wales asking which of the following attractions, if any, they had visited:

-National Slate Museum
-National Wool Museum
-National Library of Wales
27 of the visitors had visited National Slate Museum and National Wool Museum and, of these, 8 had visited all three attractions.

72 of the people had visited National Library of Wales.

70 of the people had visited National Slate Museum.

Some further information is given on the Venn diagram below. How many visitors had visited the National Library of Wales only?

`,
        skillLevel: 1,
        tags: ["sets", "Venn Diagram"],
      },
      {
        answer1: `49 visitors`,
        answer2: `41 visitors`,
        answer3: `94 visitors`,
        answer4: `36 visitors`,
        correct_answer: 2,
        explaination: `You need to subtracting numbers of tourist which are not in the section of the diagram you want to find. from 200 (all tourist numbers) subtract 53 for the prople who had not visited any of the mountains. Then, subtract 70 for the people who had visited Snowdon, and subtract 25 and 11 from all the people who had visited Ben Nevis but had never been to Scafell Pike.`,
        hint: `Which part of the diagram does the answer go in?`,
        image: `https://bam.files.bbci.co.uk/bam/live/content/zqhtbk7/small`,
        source: `https://www.bbc.co.uk/bitesize/guides/zt7rk7h/test`,
        question: `A survey was carried out on 200 tourists to the UK asking which of the following mountains, if any, they had visited:

-Snowdon
-Scafell Pike
-Ben Nevis
6 of the visitors had visited all three mountains.

56 of the people had visited Ben Nevis.

70 of the people had visited Snowdon.

53 people had not visited any of the mountains.

Some further information is given on the Venn diagram below. How many visited Scafell Pike only?`,
        skillLevel: 2,
        tags: ["sets", "Venn Diagram"],
      },
      {
        answer1: ``,
        answer2: ``,
        answer3: ``,
        answer4: ``,
        correct_answer: 1,
        explaination: ``,
        hint: ``,
        image: ``,
        source: ``,
        question: ``,
        skillLevel: 1,
        tags: ["sets", "Venn Diagram"],
      },
    ];

    const another = [
      {
        answer1: "{}",
        answer2: "{{}}",
        answer3: "{{1}}",
        answer4: "{1}",
        correct_answer: 1,
        explaination: "Singleton set has only 1 member",
        hint: "There is a set with none",
        image: null,
        source: "Perth",
        question: "Which one is not a singleton set",
        skillLevel: 1,
        tags: ["sets", "type of sets"],
      },
      {
        answer1: "{1,2,3,…,99,100}",
        answer2: "{1,2,3,4,5}",
        answer3: "{a,b,c}",
        answer4: "{1,2,3,…}",
        correct_answer: 4,
        explaination: "Infinite set has unlimited members",
        hint: "Infinite set has more members than finite set",
        image: null,
        source: "Perth",
        question: "Which one is infinite set",
        skillLevel: 1,
        tags: ["sets", "type of sets"],
      },
      {
        answer1: "9",
        answer2: "89",
        answer3: "90",
        answer4: "82",
        correct_answer: 3,
        explaination: "Equal sets are sets that contain all same members",
        hint: "Equal sets property",
        image: null,
        source: "Perth",
        question: "If A={1,9,b} ,B={1,a,81} and A=B then a+b=? ",
        skillLevel: 1,
        tags: ["sets", "type of sets"],
      },
      {
        answer1: "{1,{2,3,4}}",
        answer2: "{1,2,{3,{4}}}",
        answer3: "{{1,2},{3,{4,}},{5,6}}",
        answer4: "{{1,2,3},{4,{5,}},6,{{7}}}",
        correct_answer: 4,
        explaination: "Equivalent sets have the same number of members",
        hint: "Somethings equal",
        image: null,
        source: "Perth",
        question: "If A={1,2,3,4} which one is equivalent set of set A",
        skillLevel: 1,
        tags: ["sets", "type of sets"],
      },
      {
        answer1: "A={$x:xinmathbb{N}$ and $x^3=8$}",
        answer2: "B={$x:xinmathbb{N}$ and $x-10=-10$}",
        answer3: "C={$x:xinmathbb{N}$ and $x+1=10$}",
        answer4: "D={$x:xinmathbb{N}$ and $x^2=9$}",
        correct_answer: 2,
        explaination: "A set with no member inside",
        hint: "Not any member",
        image: null,
        source: "Perth",
        question: "Which one is a null set",
        skillLevel: 1,
        tags: ["sets", "type of sets"],
      },
      {
        answer1: "A={$x:xinmathbb{R}$ and $x^2=4$}",
        answer2: "B={$x:xinmathbb{R}$ and $0div x=0$}",
        answer3: "C={$x:xinmathbb{R}$ and $xcdot 0=1$}",
        answer4: "D={$x:xinmathbb{R}$ and $x+x=14$}",
        correct_answer: 4,
        explaination: "Singleton set has only one member",
        hint: "One member",
        image: null,
        source: "Perth",
        question: "Which one is a singleton set",
        skillLevel: 2,
        tags: ["sets", "type of sets"],
      },
      {
        answer1: "A={$x:xinmathbb{R}$ and $sqrt[]x = 2 $}",
        answer2: "B={$x:xinmathbb{R}$ and $0< x<1$}",
        answer3: "C={$x:xinmathbb{N}$ and $0< x<1$}",
        answer4: "D={$x:xinmathbb{N}$ and $sqrt[]x = 2$}",
        correct_answer: 2,
        explaination: "Infinite set has infinite members",
        hint: "Infinite members",
        image: null,
        source: "Perth",
        question: "Which one is infinite set",
        skillLevel: 2,
        tags: ["sets", "type of sets"],
      },
      {
        answer1: "null set",
        answer2: "singleton set",
        answer3: "finite set",
        answer4: "infinite set",
        correct_answer: 3,
        explaination: "T={1,2,3,…,98}",
        hint: "$mathbb{N}$ is natural number",
        image: null,
        source: "Perth",
        question: "T={$x:xin mathbb{N}$ and $x<99$} What is a type of set T",
        skillLevel: 2,
        tags: ["sets", "type of sets"],
      },
      {
        answer1: "singleton set",
        answer2: "equivalent set",
        answer3: "infinite set",
        answer4: "null set",
        correct_answer: 1,
        explaination: "P={{1,2,3,4,5,6,7,8,9}}",
        hint: "Natural number doesn’t have fractions and decimals",
        image: null,
        source: "Perth",
        question:
          "P={{$x:xin mathbb{N}$ and $x<10$}} What is the type of set P",
        skillLevel: 3,
        tags: ["sets", "type of sets"],
      },
      {
        answer1: "A is singleton set and B is finite set",
        answer2: "A and B are equal sets",
        answer3: "A and B are equivalent sets",
        answer4: "A is null set and B is singleton set",
        correct_answer: 4,
        explaination: "A={} and B={27}",
        hint: "Natural number doesn’t have fractions and decimals",
        image: null,
        source: "Perth",
        question:
          "If A={$x:xin mathbb{N}$ and $xcdot2=1$} and B={$x:xin mathbb{N}$ and $xdiv3=9$} Which one is correct answer",
        skillLevel: 3,
        tags: ["sets", "type of sets"],
      },
    ];

    another.forEach((quiz, index) => {
      console.log(typeof String(index));
      // console.log(quiz);
      const quizRef = doc(
        db,
        "quiz_sets",
        "Venn diagrams",
        "level1",
        String(index)
      );
      setDoc(quizRef, quiz);
    });
  };

  useEffect(() => {
    if (mapsData) {
      const mapsCopy = [];
      maps.forEach((map, index) => {
        // console.log(map, index);
        const mapData = mapsData[map.id];
        const mapCopy = {
          ...map,
          ...mapData,
        };
        mapsCopy.push(mapCopy);
      });
      setMaps(mapsCopy);
    }
    console.log("map data changed from home");
    // console.log(modulesData);
  }, [mapsData]);
  let counter = 0;

  return (
    <HomeBackground>
      {/* <SafeTop /> */}
      <ScrollView>
        <Spacer size="large" />
        <Spacer size="large" />
        <Spacer size="large" />
        <Spacer size="large" />
        <Spacer size="large" />
        <Spacer size="large" />
        <Spacer size="large" />
        <MathView
          math={"asdadx=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}\\varnothing"}
          color="white"
          style={{
            fontSize: 50,
          }}
        />
        <MathText
          value="$B=\\text{\\{textbook, notebook, calculator, desk\\}}$"
          color="white"
          style={{
            backgroundColor: "green",
            textColor: "white",
            fontSize: 20,
          }}
        />
        <MathView math="\cos\left(x\right)=\frac{b}{c}" color="white" />
        <Button mode="contained" onPress={onAddQuiz}>
          ADD QUIZ
        </Button>

        <TitleContainer
          style={{ backgroundColor: theme.colors.accent.tertiarym }}
        >
          <TitleText>{" Today "}</TitleText>
        </TitleContainer>
        <Today style={shadow} navigation={navigation} />
        <TitleContainer
          style={{ backgroundColor: theme.colors.accent.quaternarym }}
        >
          <TitleText>{" maps "}</TitleText>
        </TitleContainer>
        <Maps maps={maps} navigation={navigation} />
        {/* <ScrollView></ScrollView> */}
        <Button onPress={onLogout}>Logout</Button>
      </ScrollView>
      <StatusBar style="light" />
    </HomeBackground>
  );
};
