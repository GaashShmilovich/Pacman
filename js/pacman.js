'use strict'

const PACMAN = '😀'
var gPacman

function createPacman(board) {
    gPacman = {
        location: {
            i: 7,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gFoodCounter--
}

function onMovePacman(ev) {
    if (!gGame.isOn) return

    const nextLocation = getNextLocation(ev)
    console.log('nextLocation:', nextLocation)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    console.log('nextCell:', nextCell)
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost? call gameOver

    if (nextCell === GHOST) {
        if (gPacman.isSuper === true) {

        }
        gameOver()
        return
    }
    if (nextCell === FOOD) {
        gFoodCounter--
        updateScore(1)
    }


    if (gFoodCounter === 0) {// check if the food  === 0
        gGame.isOn = false
        clearInterval(gIntervalGhosts)
        var elModal = document.querySelector('.modal')
        elModal.style.display = 'block'
        var strHTML = `Victory!🏆`
        document.querySelector('.modal h2').innerHTML = strHTML
        return

    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }

    if (nextCell === POWER) {
        gPacman.isSuper = true
        gFoodCounter--
        // checkIsWin()
        changeGhostsColor()
        //after 5 sec change back to normal pacman
        setTimeout(() => {
            for (var i = 0; i < gGhosts.length; i++) {
                var currGhost = gGhosts[i]
                currGhost.color = getRandomColor()
            }
        }, 5000)
        changeGhostsColor()

        //changeGhostColor 

    }

    // moving from current location:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // console.log('eventKeyboard.code:', eventKeyboard.code)

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        default: return null
    }

    return nextLocation
}