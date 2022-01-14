import { Button, Container, Fab, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AnswersCard from './components/AnswersCard';
import { getQuestion, QuestionDetail } from './actions/getQuestions';
import Loading from './components/Loading';
import bg2 from "./assets/bg.jpg"
import Difficulty from './components/Difficulty';
const style = {
  backgroundImage: `url(${bg2})`,
  width: '100%',
  height: '100vh',
  backgroundSize: "cover",
  backgroundPosition: "top"
}
const difficulty = ["hard", "easy", "medium"]
const App: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionDetail[]>([]);
  const [currenrQuestion, setcurrentQuestion] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [playAgain, setPlayAgain] = useState<boolean>(false);
  const [diff, setDiff] = useState<string>("");
  useEffect(() => {

    (async () => {
      if (diff && start) {
        let data = await getQuestion(10, diff);
        setQuestions(data);
        
        setcurrentQuestion(0);
       
        setScore(0);

      }

    })();
  }, [start, diff]);

  const checkAns = (ans: string, correct_answer: string) => {
    if (currenrQuestion + 1 >= 10) {
      setStart(false);
      setQuestions([])
    }
    setcurrentQuestion(currenrQuestion + 1);
    if (ans === correct_answer) {
      setScore(score + 1);
      return true;
    }
    return false
  }
  return (
    <div style={style}>
      <Container className="app">

        <h1>React Quiz App</h1>
        <h3>Your Score : {score}</h3>
        <h3>Questions : {currenrQuestion}/10</h3>
        {questions.length > 0 && diff && start && currenrQuestion <= 9 && <AnswersCard
          key={currenrQuestion}
          question={questions[currenrQuestion].question}
          ans={questions[currenrQuestion].ans}
          correct_answer={questions[currenrQuestion].correct_answer}
          checkAns={checkAns}
          difficulty={questions[currenrQuestion].difficulty}
        />}

        <div className='gameplay' style={{ display: `${start && currenrQuestion <= 9 ? "none" : ""}` }}>
          <Grid container columnSpacing={{ xs: 2 }} justifyContent="center" className="diff">
            {difficulty.map((item, index) => {
              return (
                <Difficulty difficulty={item} setDifficilty={setDiff} key={index} onChoose={diff === item ? true : false} />
              )
            })}
          </Grid>
          {diff && <Button variant="contained" color="error"
            onClick={() => {
              if (start && currenrQuestion > 9 || diff) {
                //play again or start game
                setStart(true)
              }
            }}
          >{currenrQuestion <= 9 ? "Start" : "Play Again"}</Button>}
        </div>
        {start && questions.length === 0 && <Loading />}
      </Container>
    </div>
  );
}

export default App;
