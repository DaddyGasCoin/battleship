
//coordinates is an array of numbers representing position of ship,
// lenth is length of ship to check if it has been desroyed or onot
const ship = (coordinates, len) => {

    let timesHit = 0
    let validblock = [...coordinates]
    const isHit = (hitTarget) => {

        if (validblock.includes(hitTarget)) {
            validblock = validblock.filter(item => item !== hitTarget)
            timesHit++
            return true
        }
        else {
            return false
        }
    }

    const isSunk = () => {
        if (timesHit <= len) {
            return false
        }
        else {
            return true
        }
    }

    return { isHit, isSunk, len, coordinates }
}


//factory for board that contains data of all ship positions 
const gameboard = () => {
    // 0 Empty block
    // 1 Shhip Block
    //'X' block attacked and hit ship unit
    //'0' block attadcked and missed ship unit
    let board = [0, 0, 0, 0, 0, 0]//to change array size to full size

    const setShip = (ship) => {

        let coord = ship.coordinates
        coord.forEach(item => {
            board[item] = 1
        });

        return board
    }

    const receiveAtk = (position) => {

        if (board[position] == 1) {
            board[position] = 'O'
            return board
        }
        else {
            board[position] = 'X'
            return board
        }
    }

    const getBoard = () => {
        return board
    }

    return { setShip, receiveAtk, getBoard }
}




const player = (oponentBoard) => {

    const placeAtk = (position) => {
        oponentBoard.receiveAtk(position)

    }
    // const board = oponentBoard.getBoard()

    const getValidAtks = (board) => {
        let validAtks = []
        board.forEach((elm, index) => {
            if (elm == 0) {
                validAtks.push(index)
            }
            if (elm == 1) {
                validAtks.push(index)
            }
        })
        return validAtks
    }

    const randomAtk = () => {
        const validAtks = getValidAtks(board)
        return validAtks[Math.floor(Math.random() * validAtks.length)];
    }

    return { placeAtk, getValidAtks, randomAtk }
}

export { ship, gameboard, player }