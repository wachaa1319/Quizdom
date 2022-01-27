import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
  Modal,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import {
  SafeBottom,
  SafeTop,
} from "../../../components/utility/safe-area.component";
import { ProgressBar, Button as ButtonNative } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Row } from "../../../components/utility/row.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { shadow } from "../../../components/shadow/shadow.styles";
import { PinchGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Choice,
  Explain,
  HintButton,
  ScoreIndicator,
} from "../components/quiz.component";
import { ChoiceContainer, NextButton } from "../components/quiz.style";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { QuizContext } from "../../../services/quiz/quiz.context";
import { MathText } from "react-native-math-view/src/fallback";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000000a2;
`;

const Button = ({ onPress, children, bottom }) => {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "absolute",
        paddingHorizontal: 30,
        padding: 10,
        bottom: bottom,
        backgroundColor: "#ffdfe9",
        borderRadius: 10,
        margin: "auto",
        alignSelf: "center",
        zIndex: 1,
        ...shadow.shadow1,
      }}
    >
      <Text
        style={{ fontSize: 20 }}
        variant="label"
        color={pressed ? "#FFFFFF" : "#470000"}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const FocusedImage = ({ uri, width, height }) => {
  const [aspect, setAspect] = useState(1);
  Image.getSize(uri, (width, height) => {
    setAspect(width / height);
    // // console.log(width / height);
  });

  return (
    <Image
      source={{ uri }}
      style={{
        width: width,
        height: width * aspect,
        resizeMode: "contain",
      }}
    />
  );
};

export function QuizScreen({ route, navigation }) {
  const { width, height } = Dimensions.get("window");
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const [w, setW] = useState(200);
  const [h, setH] = useState(200);
  const [position, setPosition] = useState("relative");
  const [onFocus, setOnFocus] = useState(false);

  const insets = useSafeAreaInsets();
  const [page, setPage] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [finished, setFinished] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [focusImage, setFocusImage] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [correctArray, setCorrectArray] = useState([]);
  const [hintArray, setHintArray] = useState([]);
  // const [quiz, setQuiz] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { score, setScore, setMetaData, quiz } = useContext(QuizContext);
  const scrollViewRef = useRef();

  useEffect(() => {
    setScore(0);
    setCorrectArray([]);
    setHintArray([]);

    const quizzes = quiz;
    if (quizzes) {
      // console.log("got qez");

      // // console.log(quizzes);
      setLoaded(true);
    } else {
      // console.log("no quiz");
    }
    // setQuiz(quizzes);
  }, []);

  // useEffect(() => {
  //   // console.log(focusImage);
  // }, [focusImage]);

  useEffect(() => {
    // console.log("page is", page);
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    if (page == 5) {
      // setFinished(true);
      // save data
      setMetaData({
        score: score,
        correctArray: correctArray,
        finished: true,
        usedHint: hintArray,
        finishedAt: new Date(),
      });
      // console.log("finished");
      // // console.log(score, correctArray, hintArray);
      navigation.navigate("QuizFinish");
    }
  }, [page]);

  const onCheck = () => {
    setCorrectAnswer(quiz[page].correct_answer);
    if (selectedChoice === quiz[page].correct_answer) {
      setChecked(true);
      setScore(score + 1);
      setCorrect(true);
      setCorrectArray([...correctArray, true]);
    } else {
      setChecked(true);
      setCorrect(false);
      setCorrectArray([...correctArray, false]);
    }

    // scrollViewRef.current?.scrollTo({ y: 800, animated: true });
  };

  const onNext = () => {
    setPage(page + 1);
    setChecked(false);
    setCorrect(null);
    setSelectedChoice(null);
    // // console.log("PAGE");
    // // console.log(page);
  };

  const onExit = () => {
    if (!finished) setShowModal(true);
  };

  const onHint = () => {
    setHintArray([...hintArray, page]);
    setShowHint(true);
  };

  if (!loaded) {
    return (
      <>
        <SafeTop>
          <ActivityIndicator size="large" style={{}} />
        </SafeTop>
      </>
    );
  }

  return (
    <>
      <SafeTop color="#a2d1a2" flex={0} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setShowModal(!showModal);
        }}
      >
        <CenteredContainer>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Are you sure you want to exit?
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <ButtonNative
                onPress={() => {
                  setShowModal(!showModal);
                }}
              >
                <Text>No</Text>
              </ButtonNative>
              <ButtonNative
                onPress={() => {
                  setShowModal(!showModal);
                  navigation.goBack();
                }}
              >
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  Yes
                </Text>
              </ButtonNative>
            </View>
          </View>
        </CenteredContainer>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={!!focusImage}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0000009d",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setFocusImage(null);
            }}
          >
            <FocusedImage uri={focusImage} width={width} height={height} />
          </TouchableOpacity>
        </View>
      </Modal>

      {page < 5 ? (
        <View style={{ flex: 1 }}>
          {quiz[page].hint && (
            <Modal animationType="fade" transparent={true} visible={showHint}>
              <TouchableOpacity
                onPress={() => {
                  setShowHint(false);
                }}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#0000009d",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  <Text>Hint: {quiz[page].hint}</Text>
                </View>
              </TouchableOpacity>
            </Modal>
          )}
          <View
            style={{
              backgroundColor: "#a2d1a2",
              padding: 10,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              paddingBottom: 20,
              zIndex: 1,
            }}
          >
            <TouchableOpacity onPress={onExit}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#960032",
                  // marginLeft: "auto",
                }}
              >
                Exit
              </Text>
            </TouchableOpacity>
            <Row>
              <Text variant="label" style={{ fontSize: 40, marginRight: -10 }}>
                #{" "}
              </Text>
              <View>
                <Text variant="label" style={{ fontSize: 40 }}>
                  {page + 1 + "/5 "}
                </Text>
              </View>
              <ProgressBar
                progress={page / 5}
                color={"#423"}
                style={{ backgroundColor: "red" }}
              />
              {/* <ScoreIndicator correctArray={correctArray} /> */}
              <HintButton showHint={onHint} />
              <ProgressBar />
            </Row>
            {/* <Text variant="label" style={{ fontSize: 40 }}>
              score: {score}
            </Text> */}
          </View>
          <ScrollView
            style={{ padding: 10, marginTop: -20, marginBottom: -20 }}
          >
            <Spacer size={"large"} />
            <MathText value={quiz[page].question} />
            {/* <Text>{quiz[page].question}</Text> */}
            {quiz[page].image && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    // // console.log("WDAD");
                    setFocusImage(quiz[page].image);
                  }}
                >
                  <Image
                    source={{ uri: quiz[page].image }}
                    defaultSource={require("../../../../assets/icon.png")}
                    style={{
                      width: w,
                      height: h,
                      // position: position,
                      alignSelf: "center",
                      resizeMode: "contain",
                      borderRadius: 20,
                    }}
                  />
                </TouchableOpacity>
              </>
            )}
            <Explain
              scrollViewRef={scrollViewRef}
              page={page}
              quiz={quiz[page]}
              checked={checked}
            />
            <Spacer size={"extraLarge"} />
          </ScrollView>
          <ChoiceContainer>
            <ScrollView ref={scrollViewRef}>
              <Choice
                setSelectedChoice={setSelectedChoice}
                number={1}
                selectedChoice={selectedChoice}
                checked={checked}
                correct={correct}
                correctAnswer={correctAnswer}
              >
                {/* <Text>{quiz[page].answer1}</Text> */}
                <MathText
                  value={quiz[page].answer1}
                  style={{
                    marginVertical: -10,
                  }}
                />
              </Choice>
              <Choice
                setSelectedChoice={setSelectedChoice}
                number={2}
                selectedChoice={selectedChoice}
                checked={checked}
                correct={correct}
                correctAnswer={correctAnswer}
              >
                {/* <Text>{quiz[page].answer2}</Text> */}
                <MathText
                  value={quiz[page].answer2}
                  style={{
                    marginVertical: -10,
                  }}
                />
              </Choice>
              <Choice
                setSelectedChoice={setSelectedChoice}
                number={3}
                selectedChoice={selectedChoice}
                checked={checked}
                correct={correct}
                correctAnswer={correctAnswer}
              >
                {/* <Text>{quiz[page].answer3}</Text> */}
                <MathText
                  value={quiz[page].answer3}
                  style={{
                    marginVertical: -10,
                  }}
                />
              </Choice>
              <Choice
                setSelectedChoice={setSelectedChoice}
                number={4}
                selectedChoice={selectedChoice}
                checked={checked}
                correct={correct}
                correctAnswer={correctAnswer}
              >
                {/* <Text>{quiz[page].answer4}</Text> */}
                <MathText
                  value={quiz[page].answer4}
                  style={{
                    marginVertical: -10,
                  }}
                />
              </Choice>

              <Spacer size={"extraLarge"} />
              <Spacer size={"extraLarge"} />
              <Spacer size={"medium"} />
            </ScrollView>
          </ChoiceContainer>
          {!checked && selectedChoice && (
            <Button onPress={onCheck} bottom={insets.bottom}>
              Check
            </Button>
          )}
          {checked && (
            <Button onPress={onNext} bottom={insets.bottom}>
              Next
            </Button>
          )}
        </View>
      ) : (
        <View>
          <Text>loading</Text>
        </View>
      )}
    </>
  );
}
