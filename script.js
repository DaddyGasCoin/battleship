
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
            return true
        }
        else {
            board[position] = 'X'
            return false
        }
    }


    return { setShip, receiveAtk }
}


export { ship, gameboard }