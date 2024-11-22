export let answer: string[] = [];

export default class Question {
    static q1() {
        // (document.getElementsByClassName('text')[0] as HTMLElement).style.display = 'none';
        // var Illustrate = document.getElementById('Illustrate');
        // if (Illustrate !== null) {
        //     Illustrate.style.display = 'none';
        // }
        // (document.getElementById('frame') as HTMLElement).style.display = 'none';
        (document.getElementById('draggable-iframe') as HTMLElement).style.width = '100%';
        answer[0] = '2';
    }

    static q2() {
        // (document.getElementsByClassName('text')[0] as HTMLElement).style.display = 'none';
        // var Illustrate = document.getElementById('Illustrate');
        // if (Illustrate !== null) {
        //     Illustrate.style.display = 'none';
        // }
        // (document.getElementById('frame') as HTMLElement).style.display = 'none';
        (document.getElementById('draggable-iframe') as HTMLElement).style.width = '60%';
        answer[0] = '2';
    }
}