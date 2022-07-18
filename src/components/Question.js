import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code

  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
      return; 
    }

    //this uses setTimeout to run a callback function after 1 second.
  
    const timerId = setTimeout(() => {
      
      setTimeRemaining((timeRemaining) => timeRemaining - 1);
    }, 1000); //decrements the time by 1 second.

//implementing a clean up function
    return function cleanup () {
      clearTimeout(timerId);
    };
  }, [timeRemaining, onAnswered]);
  // useEffect(() => {}, [variable1, variable2]): 
  //Dependencies array with elements in it we want to run the effect every time timeRemaining changes
  // Run the side effect any time the variable(s) change
  // onAnswered is also a dependency, even though it doesn't change

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
