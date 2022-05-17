const cards = document.querySelectorAll('.card')
cards.forEach(card => card.addEventListener('click', flipCard))
let firstCardElement = null

function flipCard(event) {
    if (event.target.classList.contains('matched') || event.target.classList.contains('flipped')) {
        return //don't do anything -- it also means exit the function
    }
    if (firstCardElement == null) {
        firstCardElement = event.target.closest('.card')
        firstCardElement.classList.add('flipped')
    }
    else {

        event.target.closest('.card').classList.add('flipped')
        setTimeout(checkMatch, 700)
        firstCardElement = null
    }
}

function checkMatch() {
    let image1 = document.querySelectorAll('.flipped > img:not(.backCard)')[0]
    let image2 = document.querySelectorAll('.flipped > img:not(.backCard)')[1]
    let card1 = image1.parentNode
    let card2 = image2.parentNode
    card1.classList.remove('flipped')
    card2.classList.remove('flipped')
    if (image1.src === image2.src) {
        card1.classList.add('matched')
        card2.classList.add('matched')
        checkWin()
    }
}

function checkWin() {
    //5 matches equals one game win
    if (document.querySelectorAll('.matched').length === document.querySelectorAll('.card').length) {
        alert('You have matched all the cards!')
        resetGame()
    }
}

function resetGame() {
    let picArray = [
        "img/bubblegum.jpg",
        "img/fin.jpg",
        "img/jake.jpg",
        "img/lump.jpg",
        "img/marc.jpg",
        "img/bubblegum.jpg",
        "img/fin.jpg",
        "img/jake.jpg",
        "img/lump.jpg",
        "img/marc.jpg",
    ]
    
    Array.from(document.querySelectorAll('.card img:not(.backCard)')).forEach(img => img.src = "")
    for (let i = 0; i < 10; i++) {
        let emptyCards = document.querySelectorAll('img[src=""]')
        let randomCard = Math.floor(Math.random() * emptyCards.length)
        emptyCards[randomCard].parentNode.classList.remove('flipped', 'matched')
        emptyCards[randomCard].src = picArray[i]
    }
}

resetGame()