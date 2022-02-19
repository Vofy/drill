import { shuffleArray } from "./arrays";

export function quizQuestionParse(question) {
    let questionText = "";
    let answers = [];
    var correct = [];
    var incorrect = [];

    if (question) {
        questionText = question.question;

        if (question.answers) {
            if (question.answers.correct) {
                correct = question.answers.correct.map(answer => ({
                    text: answer,
                    correct: true
                }));
            }

            if (question.answers.incorrect)  {
                incorrect = question.answers.incorrect.map(answer => ({
                    text: answer,
                    correct: false
                }));
            }
        }

        answers = shuffleArray(correct.concat(incorrect));
    }


    return {
        question: questionText,
        answers: answers
    }
}