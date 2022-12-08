import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { ContextProvider } from "../components/ContextProvider";
import { useContext } from "react";
import { Questions } from "../components/Questions";
import { QuestionareSettings } from "../components/QuestionareSettings";

export const LandingPage = () => {
  //The contextProvider is being set to communicate the the "Categories"-component.
  const { categoryID } = useContext(ContextProvider);

  //State to track wether or not a current questionare is running.
  const [game, setGame] = useState(false);

  // API-get call with axios package with URL controlling how many questions, topic etc. The call is initialized with a useEffect function and stored in a useState. The depencty in useEffects activates on button press.
  const [post, setPost] = useState([]);

  //A refrence array to identify how many questions and where they are allowing to check whether or not the answer is correct.
  const [answer, setAnswer] = useState([]);

  //An array to keep track of the ammount of questions. Gets edited after API call.
  const questionsStatus = [];

  //Sets up the ApiData in an array of objects and shuffles the multiple choices for the multiple choice questions.
  function handleQuestionsStatus(ApiData) {
    //Randomizer function for shuffling an array.
    function randomizeAnswers(values) {
      let index = values.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (index !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * index);
        index--;

        // And swap it with the current element.
        [values[index], values[randomIndex]] = [
          values[randomIndex],
          values[index],
        ];
      }

      return values;
    }

    for (let x = 0; x < ApiData.length; x++) {
      const answerArray = ApiData[x].incorrect_answers;
      answerArray.push(ApiData[x].correct_answer);

      questionsStatus.push({
        value: "",
        answered: false,
        type: ApiData[x].type,
        choices:
          ApiData[x].type === "multiple"
            ? randomizeAnswers(answerArray)
            : [true, false],
        key: x,
      });
    }
    console.log(questionsStatus);
    setAnswer(questionsStatus);
  }

  // Dispatch function that edits the initialState or rather the copy of it that useReducer made. It seperates what commands to run dependent on what the input object's value of object.input is.
  function reducer(state, action) {
    switch (action.input) {
      case "slider": {
        return { ...state, slider: action.value };
      }
      case "categoryID": {
        return { ...state, categoryID: action.value };
      }
      case "difficulty": {
        return { ...state, difficulty: action.value };
      }
      default: {
        return { ...state };
      }
    }
  }

  //A useEffect set to run every time "categoryID" changes. This is to communicate with the "Categories" component and allows for future use of communications between components.
  useEffect(() => {
    const action = {
      input: "categoryID",
      value: categoryID,
    };
    dispatch(action);
  }, [categoryID]);

  //HandleSubmit function to call the API for relevant info.
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(`https://opentdb.com/api.php?`, {
        params: {
          amount: state.slider,
          category: state.categoryID,
          difficulty: state.difficulty,
        },
      })
      .then((response) => {
        setPost(response.data.results);
        handleQuestionsStatus(response.data.results);
      })
      .then(() => setGame(true));
  }

  //The useReducer to handle the difficulty, category and ammount of questions to ask from the API. Starts with defining the initial state. "slider" sets the slider for ammount of questions. "categoryID" sets the category however the initial state for categoryID is set in "App.js". The "difficulty" is the radio buttons.
  const initialState = {
    slider: 1,
    categoryID: categoryID,
    difficulty: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  //zeFunction updates the slider value and dispatches the action to the useReducer.
  function zeFunction(event) {
    const action = {
      input: "slider",
      value: event.target.value,
    };
    dispatch(action);
  }

  //Sends information to dispatch function to update the difficulty settings.
  function handleDifficulty(event) {
    const action = {
      input: "difficulty",
      value: event.target.value,
    };
    dispatch(action);
  }

  //Logging the answer for relevant questions.
  function logAnswer(event, index) {
    console.log(index);
    if (post[index].correct_answer === event.target.innerText) {
      setAnswer((oldAnswer) =>
        oldAnswer.map((input) => {
          return input.key === index
            ? {
                ...input,
                value: <h2>Correct</h2>,
                answered: true,
              }
            : input;
        })
      );
    } else {
      setAnswer((oldAnswer) =>
        oldAnswer.map((input) => {
          return input.key === index
            ? {
                ...input,
                value: <h2>Wrong</h2>,
                answered: true,
              }
            : input;
        })
      );
    }
  }

  function newGame() {
    setGame(!game);
    setAnswer([]);
  }

  return (
    <div className="main-container">
      <h1>Questionare</h1>
      {!game && (
        <QuestionareSettings
          state={state}
          handleSubmit={handleSubmit}
          zeFunction={zeFunction}
          handleDifficulty={handleDifficulty}
        />
      )}
      {game && (
        <Questions
          value={post}
          logAnswer={logAnswer}
          restart={newGame}
          hasAnswered={answer}
          game={game}
        />
      )}
    </div>
  );
};
