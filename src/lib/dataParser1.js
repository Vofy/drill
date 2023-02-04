import { shuffleArray } from "./arrays";

export function quizQuestionParse(task) {
    let taskTitle = "";
    let answers = [];
    var correct = [];
    var incorrect = [];

    if (task) {
        taskTitle = task.title;

        if (task.answers) {
            if (task.answers.correct) {
                correct = task.answers.correct.map(answer => ({
                    text: answer,
                    correct: true
                }));
            }

            if (task.answers.incorrect)  {
                incorrect = task.answers.incorrect.map(answer => ({
                    text: answer,
                    correct: false
                }));
            }
        }

        answers = shuffleArray(correct.concat(incorrect));
    }


    return {
        title: taskTitle,
        answers: answers
    }
}