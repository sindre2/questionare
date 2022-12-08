import { AnswerButton } from "./styledComponents/AnswerButton";

export const Questions = (props) => {
  const short = props.value;
  const hasAnswered = props.hasAnswered;
  console.log(hasAnswered);

  //Rendering function that prints out the questions and the answers depending on wether they are a "multiple" or a "boolean" question.
  const renderQuestions = short.map((input, index) => {
    if (input.type === "multiple") {
      return (
        <div className="question-multiple" key={index * 10} id={index}>
          <h3>{input.question}</h3>
          <div className="answer-box">
            {!hasAnswered[index].answered
              ? hasAnswered[index].choices.map((data, count) => {
                  console.log(data);
                  return (
                    <div
                      className="answer"
                      key={index === 0 ? -100 + count : index / count}
                    >
                      <AnswerButton
                        onClick={(event) => props.logAnswer(event, index)}
                      >
                        {data}
                      </AnswerButton>
                    </div>
                  );
                })
              : hasAnswered[index].value}
          </div>
          {/* {!hasAnswered[index].answered ? renderMultiple(input, index) : hasAnswered[index].value} */}
        </div>
      );
    } else if (input.type === "boolean") {
      return (
        <div className="question-boolean" key={index} id={index}>
          <h3>{input.question}</h3>
          
            <div className="answer-boolean">
            {!hasAnswered[index].answered ? (<>
              <AnswerButton onClick={(event) => props.logAnswer(event, index)}>
                True
              </AnswerButton>
              <AnswerButton onClick={(event) => props.logAnswer(event, index)}>
                False
              </AnswerButton>
            
              </>) : (
            hasAnswered[index].value
          )}
          </div>
        </div>
      );
    } else return <h1>Something went wrong, lawl</h1>;
  });

  //The final render calling on the function "renderQuestions".
  return (
    <>
      <div className="question-container">{renderQuestions}</div>
      <div className="newGame">
        <AnswerButton className="newGame" onClick={props.restart}>
          New Game
        </AnswerButton>
      </div>
    </>
  );
};
