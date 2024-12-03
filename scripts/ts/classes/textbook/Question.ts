import Doc from "../doct/doct.js";
import Table from "./Table.js";

export let answer: string[] = [];

export default class Question {
    static elementStateMap = new Map<HTMLElement, { filter: string | null, animationPlayState: string | null }>();
    static answer: string;

    static q1() {
        Doc.getElementById('right').style.width = '100%';
        answer[0] = '2';
    }

    static q2() {
        // (document.getElementsByClassName('text')[0] as HTMLElement).style.display = 'none';
        // var Illustrate = document.getElementById('Illustrate');
        // if (Illustrate !== null) {
        //     Illustrate.style.display = 'none';
        // }
        // (document.getElementById('frame') as HTMLElement).style.display = 'none';
        Doc.getElementById('right').style.width = '60%';
        answer[0] = '2';
    }

    static q3() {
        Doc.getElementById('question').remove();
        Doc.getElementById('editor-iframe').remove();
        Table.compareTable();
    }

    static q4() {
        const elements = <HTMLElement[]>Array.from(document.querySelectorAll('*:not(html):not(body):not(head):not(#base):not(#left *):not(#left):not(#lesson-media)'));

        elements.forEach(element => {
            Question.elementStateMap.set(element, {
                filter: element.style.filter || null,
                animationPlayState: element.style.animationPlayState || null,
            });
            element.style.filter = 'blur(2px) grayscale(100%)';
            element.style.animationPlayState = "paused";
        });

        Question.answer = "aaaaaa";
    }

    static q5() {
        const elements = <HTMLElement[]>Array.from(document.querySelectorAll('*:not(html):not(body):not(head):not(#base):not(#left *):not(#left):not(#lesson-media)'));

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
    }
}