'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWER = '+'
const CHERRY = '🍒'
var gFoodCounter = 0

const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gCherryInterval


function onInit() {

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard)
    gCherryInterval = genCherryInterval()
    gGame.isOn = true
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    document.querySelector('h2 span').innerText = gGame.score = 0
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2) || (j === 7 && i > 2 && i < size - 4)) {
                board[i][j] = WALL
            } else {
                board[i][j] = FOOD
                gFoodCounter++
            }

            if (i === 1 && j === size - 2 || i === 1 && j === size - 9 || i === 8 && j === 1 || i === 8 && j === 8) {
                board[i][j] = POWER
            }

        }
    }
    console.log('board:', board)
    return board
}


function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    renderCell(gPacman.location, EMPTY)
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    var strHTML = `Game Over`
    document.querySelector('.modal h2').innerHTML = strHTML


}

function genCherryInterval() {
    gCherryInterval = setInterval(generateCherry, 15000)
}

function generateCherry() {
    const emptyCell = getEmptyCell()
    if (!emptyCell) return
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)

}

function getEmptyCell(board = gBoard) {
    const emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            if (currCell === EMPTY)
                emptyCells.push({ i, j })
        }
    }
    return emptyCells[getRandomIntInclusive(0, emptyCells.length - 1)]

}
