const memoriaContainer = document.getElementById('memoria-container');
const gridWidth = window.getComputedStyle(memoriaContainer).getPropertyValue('grid-template-rows').split(" ").length;
const gridHeight = window.getComputedStyle(memoriaContainer).getPropertyValue('grid-template-columns').split(" ").length;

const formats = ['triangle', 'circle', 'square', 'losango'];
const colors = ['#e70000', '#00b400', '#0065c4', '#e5e766'];

let pattern = [];
let clicked = [];
let acertos = [];

// Create Pattern
function createPattern() {
    for (let cardAmount = 0; cardAmount < (gridHeight * gridWidth) / 2; cardAmount++) {
        let card = formats[Math.floor(Math.random() * 4)];
        let color = colors[Math.floor(Math.random() * 4)];
        pattern.push({ card: card, color: color });
        pattern.push({ card: card, color: color });
    }
}

// Generate Cards
function createCards() {
    createPattern()
    clicked = [];
    acertos = [];
    memoriaContainer.innerHTML = ''
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const card = document.createElement('div');
            card.classList.add('card');
            const front = document.createElement('div');
            front.classList.add('face', 'front');
            const back = document.createElement('div');
            back.classList.add('face', 'back');

            const selectedCard = pattern[Math.floor(Math.random() * pattern.length)];

            front.classList.add(selectedCard.card);
            front.style.setProperty('--color', selectedCard.color);

            pattern.splice(pattern.indexOf(selectedCard), 1);

            card.addEventListener('click', () => {
                if (!card.classList.contains('rotate')) {
                    card.classList.add('rotate');
                    clicked.push(card.firstChild);
                }
                if (clicked.length == 2) {
                    if (clicked[0].classList[2] == clicked[1].classList[2] &&
                        window.getComputedStyle(clicked[0], ':after').getPropertyValue('--color') == window.getComputedStyle(clicked[1], ':after').getPropertyValue('--color')) {
                        acertos.push(clicked[0], clicked[1]);
                        clicked[1].parentNode.ontransitionend = () => {
                            if (acertos.length == gridWidth * gridHeight) {
                                createCards()
                            }
                        }
                        clicked = []
                    } else {
                        clicked[1].parentNode.ontransitionend = () => {
                            clicked.forEach((c) => {
                                c.parentNode.classList.toggle('rotate');
                            })
                            clicked[1].parentNode.ontransitionend = '';
                            clicked = [];
                        }
                    }
                }
            })
            card.append(front, back);
            memoriaContainer.appendChild(card);
        }
    }
}

createCards()