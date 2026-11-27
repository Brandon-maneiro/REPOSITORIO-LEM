const mainDiv = document.getElementById('setgame-screen');
const cards = document.querySelector('#cards-container');
const place = document.querySelector('#place-cards-container')

const answer = document.getElementById('setgamePlace');

const cardsFormats = [
    { formato: "diamond", quantidade: 1, cor: "red" },
    { formato: "square", quantidade: 2, cor: "green" },
    { formato: "circle", quantidade: 3, cor: "red" },
    { formato: "diamond", quantidade: 2, cor: "green" },
    { formato: "circle", quantidade: 1, cor: "red" },
    { formato: "square", quantidade: 2, cor: "blue" },
    { formato: "circle", quantidade: 3, cor: "green" },
    { formato: "square", quantidade: 1, cor: "blue" },
    { formato: "square", quantidade: 2, cor: "red" },
    { formato: "circle", quantidade: 3, cor: "blue" },
    { formato: "square", quantidade: 3, cor: "blue" },
    { formato: "diamond", quantidade: 2, cor: "blue" },
]

mainDiv.addEventListener('click', () => {
    let checkWin = 0
    let testArray = [[], [], []]
    for (const placeCard of place.children){
        if (placeCard.classList.contains('card')){
            testArray[0].push(placeCard.classList[1])
            testArray[1].push(placeCard.classList[2])
            testArray[2].push(placeCard.children.length)            
            checkWin++
        }
        if (checkWin == 3){
            let win = [false, false, false]
            testArray.forEach((cards, index) => {
                let testDuplicateArray = []
                let c = 0                
                cards.forEach((card) => {
                    if (!testDuplicateArray.includes(card)){
                        testDuplicateArray.push(card)
                    } else {
                        c++
                    }
                })
                if (c == 0 || c == 2){
                    win[index] = true
                } else {
                    win[index] = false
                }
            })
            console.log(win)
            if (win[0] && win[1] && win[2]){
                alert('ACERTOU!')
            } else {
                alert('ERROU!')
            }
        }
    }    
})

let selected;
cardsFormats.forEach((card, index) => {
    const atual_card = cards.children[index]
    atual_card.classList.add(card.formato)
    atual_card.classList.add(card.cor)
    for (let qtd = 0; qtd < card.quantidade; qtd++) atual_card.append(document.createElement('div'));
    
    cards.children[index].addEventListener('click', clickHandler)    
})

function clickHandler(e) {    
    if (!selected) {
        if (e.target.parentElement.classList.contains('card')){
            selected = e.target.parentElement
        } else {
            selected = e.target
        }
        addEventListener('mousemove', mouseMoveHandler)
        selected.style['position'] = "absolute"
        selected.style['z-index'] = "3"        
    } else {        
        for (const placeCard of place.children){
            if (checkDivCollision(selected, placeCard)){
                selected.style['position'] = ""
                selected.style['left'] = ""
                selected.style['top'] = ""
                let newCard = selected.cloneNode(true)
                placeCard.replaceWith(newCard)
                newCard.addEventListener('click', () => {
                    let cloneNewCard = newCard.cloneNode(true)
                    cards.appendChild(cloneNewCard)
                    cloneNewCard.addEventListener('click', clickHandler)
                    newCard.replaceWith(document.createElement('div'))                    
                })
                selected.remove()
                selected = ""
                return
            } else if (placeCard == place.children[place.children.length - 1]){
                selected.style['position'] = ""
                selected.style['left'] = ""
                selected.style['top'] = ""
                let cloneCard = selected.cloneNode(true)
                cards.appendChild(cloneCard)
                cloneCard.addEventListener('click', clickHandler)
                selected.remove()
                selected = ""
            }
        }
    }
}

function mouseMoveHandler(e) {
    if (selected) {
        selected.style['left'] = e.clientX - cards.getBoundingClientRect().left - (selected.getBoundingClientRect().width / 2) + 'px'
        selected.style['top'] = e.clientY - cards.getBoundingClientRect().top - (selected.getBoundingClientRect().height / 2) + 'px'
    }                
}

function checkDivCollision(div1, div2){
    let testColl = div1.getBoundingClientRect()
    let testColl2 = div2.getBoundingClientRect()
    if (testColl.right > testColl2.left && testColl.left < testColl2.right &&
        testColl.bottom > testColl2.top && testColl.top < testColl2.bottom) {
            return true
        }
}