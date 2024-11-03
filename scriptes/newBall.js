class BallAnimation {
    static objs = [document.getElementById('ball'), document.getElementById('shadow')];

    static remove(animationId) {
        BallAnimation.objs.forEach(obj => obj.classList.remove(animationId));
    }

    static add(animationId) {
        BallAnimation.objs.forEach(obj => obj.classList.add(animationId));
    }

    static jump() {
        BallAnimation.remove('roll');
        BallAnimation.add('jump');
    }

    static roll() {
        BallAnimation.add('roll');
        BallAnimation.remove('jump');
    }

    static normal() {
        BallAnimation.remove('roll');
        BallAnimation.remove('jump');
    }

    static jumpOnce() {
        BallAnimation.jump();
        setTimeout(() => BallAnimation.normal(), 800 + 10);
    }
}

function getHelloMsg() {
    var hour = new Date().getHours();
    if (hour >= 4 && hour < 12) {
        return "早安";
    } else if (hour >= 12 && hour < 18) {
        return "午安";
    } else {
        return "晚安";
    }
}

async function populate() {
    const requestURL =
        "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const superHeroes = await response.json();

    populateHeader(superHeroes);
    populateHeroes(superHeroes);
}

const chats = [
    getHelloMsg(),
    `Integer`,
    '相對論和量子力學的提出給物理學帶來了革命性的變化，它們共同奠定了現代物理學的基礎。',
    '相對論極大地改變了人類對宇宙和自然的「常識性」觀念，提出了「同時的相對性」、「四維時空」、「彎曲時空」等全新的概念。',
    '不過近年來，人們對於物理理論的分類有了一種新的認識——以其理論是否是決定論的來劃分古典與非古典的物理學，即「非古典的＝量子的」。',
    '在這個意義下，相對論仍然是一種古典的理論。'
];

function click(init) {
    // Update message if time change
    chats[0] = getHelloMsg();

    const textElement = document.getElementsByClassName('text')[0];

    if (!init) {
        // Id + 1, and keep it within range
        textElement.id = (parseInt(textElement.id, 10) + 1) % chats.length;
    }

    // Set text of the chat
    textElement.innerHTML = chats[parseInt(textElement.id, 10)];

    // Calc width (chinese char and chinese sige +2, english char and normal sige +1)
    let width = 0;
    for (let char of textElement.innerHTML) {
        width += /[\u4e00-\u9fa5\uff0c\u3002\u3001\u300c\u300d\uff1b\uff1a\uff08\uff09\uff1f\uff01\u3010\u3011\u300a\u300b\u2014\u2026\u2013\u2018\u201c\u201d\uff0e]/.test(char) ? 2 : 1;
    }
    textElement.style.width = width + 'ch';

    // Show the caret
    textElement.style.borderRightColor = 'rgb(0, 0, 0)';

    // Appear letter by letter, with a blinking caret
    textElement.style.animation = 'typing ' + (width / 10) + 's steps(' + textElement.innerHTML.length + '), caret 0.8s steps(1) infinite';

    // Make the caret disappear after typing is complete
    setTimeout(() => {
        textElement.style.animation = '';
        textElement.style.borderRightColor = 'transparent';
    }, ((width / 10) * 1000) + 500);
}

function eventHook() {
    document.getElementById('frame').addEventListener('click', () => click(false));
}