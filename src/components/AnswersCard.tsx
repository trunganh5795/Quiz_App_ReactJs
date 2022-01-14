import { Box } from '@mui/system'
import React, { useRef, useState } from 'react'
import { QuestionDetail } from '../actions/getQuestions';
type Question = QuestionDetail & {
    checkAns: (ans: string, correct_answer: string) => boolean;
};
const AnswersCard: React.FC<Question> = ({ question, ans, difficulty, correct_answer, checkAns }) => {
    const [choose, setChoose] = useState<string>("");
    const [showAns, setShowAns] = useState<string>("");
    return (
        <Box className="question_card">
  
            <p dangerouslySetInnerHTML={{ __html: question }} />
            {ans?.map((item, index) => {
                return (<Box className={item === showAns ? "answer_card answer_card_correct" : choose === item ? "answer_card answer_card_choose" : "answer_card"} key={index}
                    onClick={() => {
                        if (!choose) {
                            setChoose(item);
                            setTimeout(() => {
                                setShowAns(correct_answer);

                            }, 1000);
                            setTimeout(() => {
                                checkAns(item, correct_answer);
                            }, 2000)
                        }
                    }}
                >
                    <p dangerouslySetInnerHTML={{ __html: item }} />
                </Box>)
            })}

            <p style={{textAlign:"left",padding:0}}>Difficulty: {difficulty}</p>
        </Box >
    )
}
export default AnswersCard