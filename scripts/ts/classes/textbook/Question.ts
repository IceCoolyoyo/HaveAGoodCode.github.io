import { messages } from "../constants/Constants.js";
import Drama, { DramaType } from "../drama/Dramas.js";
import Left from "../left/Left.js";
import { processMessage } from "../message/Message.js";
import MessageID from "../message/MessageID.js";

export let answer: string[] = [];

export default class Question {
    static elementStateMap = new Map<HTMLElement, { filter: string | null, animationPlayState: string | null }>();
    static answer: string;
    static question_answer: HTMLElement;
    static timeStop: boolean = false;

    static {
        const question_answer: HTMLElement = document.createElement("input");
        question_answer.id = "question-answer";
        question_answer.oninput = function () {
            setTimeout(() => {
                if ((this as HTMLInputElement).value === Question.answer) {
                    Question.q5();
                }
            }, 300);
        };
        Question.question_answer = question_answer;
    }

    static q4() {
        const elements = <HTMLElement[]>Array.from(document.querySelectorAll('*:not(html):not(body):not(head):not(#base):not(#left *):not(#left)'));

        elements.forEach(element => {
            Question.elementStateMap.set(element, {
                filter: element.style.filter || null,
                animationPlayState: element.style.animationPlayState || null,
            });
            element.style.filter = 'blur(2px) grayscale(100%)';
            element.style.animationPlayState = "paused";
        });

        Question.timeStop = true;
    }

    static async q5() {
        const elements = <HTMLElement[]>Array.from(document.querySelectorAll('*:not(html):not(body):not(head):not(#base):not(#left *):not(#left)'));

        elements.forEach(element => {
            const originalState = Question.elementStateMap.get(element);
            if (originalState) {
                if (originalState.filter !== null) {
                    element.style.filter = originalState.filter;
                } else {
                    element.style.filter = "";
                }
                if (originalState.animationPlayState !== null) {
                    element.style.animationPlayState = originalState.animationPlayState;
                } else {
                    element.style.animationPlayState = "";
                }
            }
        });

        Left.clear();

        Question.timeStop = false;
        (Question.question_answer as HTMLInputElement).value = "";
        while (messages[MessageID.getID()].type !== DramaType.Ball) {
            await processMessage();
        }
        await processMessage();
    }

    static q6() {
        (document.getElementById("left") as HTMLElement).appendChild(Question.question_answer);
    }
}