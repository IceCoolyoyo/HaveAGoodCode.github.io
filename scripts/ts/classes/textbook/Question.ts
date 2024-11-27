import Doc from "../doct/doct.js";
import Table from "./Table.js";

export let answer: string[] = [];

export default class Question {
    static q1() {
        Doc.getElementById('editor-iframe').style.width = '100%';
        answer[0] = '2';
    }

    static q2() {
        // (document.getElementsByClassName('text')[0] as HTMLElement).style.display = 'none';
        // var Illustrate = document.getElementById('Illustrate');
        // if (Illustrate !== null) {
        //     Illustrate.style.display = 'none';
        // }
        // (document.getElementById('frame') as HTMLElement).style.display = 'none';
        Doc.getElementById('editor-iframe').style.width = '60%';
        answer[0] = '2';
    }

    static q3() {
        Doc.getElementById('question').remove();
        Doc.getElementById('editor-iframe').remove();
        Table.compareTable();
    }
}