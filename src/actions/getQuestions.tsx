export type QuestionDetail = {
    question: string;
    ans: string[];
    correct_answer: string;
    difficulty: string;

}
const mixAns = (ans: string[], correctAns: string) => {
    let idxAns = Math.floor(Math.random() * 4);
    ans.push(correctAns);
    // Swap correct answer
    let tmp = ans[idxAns];
    ans[idxAns] = ans[3];
    ans[3] = tmp;
}
export const getQuestion = async (amount: number, difficulty: string): Promise<QuestionDetail[]> => {
    let data = await fetch(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`).then(res => res.json());
    let questions = data.results.map((item: any) => {
        let { question, correct_answer, incorrect_answers, difficulty } = item;
        mixAns(incorrect_answers, correct_answer);
        return { question, correct_answer, ans: incorrect_answers, difficulty }
    })
    return questions
}