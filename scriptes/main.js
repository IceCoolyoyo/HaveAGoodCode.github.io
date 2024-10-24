let currentIndex = 1;
// Hello Svg

const elements = document.querySelectorAll('.center > *:not(.nohide)');

var index = 0;
elements.forEach(obj => {
    if (index !== 0) {
        obj.style.display = 'none'
    }
    index++;
});

document.addEventListener('click', (event) => {
    if (currentIndex < elements.length && !elements[currentIndex].classList.contains('blocked') && event.target.tagName !== 'BUTTON') {
        if (elements[currentIndex].classList.contains('next_page')) {
            next_page();
        } else if (elements[currentIndex].classList.contains('delete_up')) {
            elements[currentIndex - 1].style.display = 'none';
            elements[currentIndex + 1].style.display = 'block';
            currentIndex += 2;
        } else {
            elements[currentIndex].style.display = 'block';
            currentIndex++;
        }
    }
});

function next_page() {
    for (var i = currentIndex - 1; i >= 0; i--) {
        elements[i].style.display = 'none';
    }
    elements[currentIndex + 1].style.display = 'block';
    currentIndex += 2;
}

function question(button) {
    var answers = [1];
    if (parseInt(button.id, 10) === answers[parseInt(button.parentNode.classList[0].split('_')[1], 10) - 1]) {
        console.log("Answer is correct!");
    } else {
        console.log("Answer isn't correct.");
    }
}