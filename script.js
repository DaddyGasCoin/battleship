
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
        if (timesHit < len) {
            return false
        }
        else {
            return true
        }
    }

    const getCoordinates = () => {
        return coordinates
    }
    const getTimesHit = () => {
        return timesHit
    }
    const getValid = () => {
        return validblock
    }
    return { isHit, isSunk, getCoordinates, getTimesHit, getValid }
}


//factory for board that contains data of all ship positions 
const gameboard = () => {
    // 0 Empty block
    // 1 Shhip Block
    //'X' block attacked and hit ship unit
    //'0' block attadcked and missed ship unit
    let board = Array(100).fill(0)
    let ships = []
    const setShip = (ship) => {
        ships.push(ship)
        renderShipDOM(ship)

        let coord = ship.getCoordinates()
        coord.forEach(item => {
            board[item] = 1
        });

        return board
    }
    const allSunk = () => {
        let flag = 0
        for (let index = 0; index < ships.length; index++) {
            if (ships[index].isSunk()) {
                flag++
            }

        }
        return flag
    }
    const checkShipHit = (position) => {
        ships.forEach(ship => {
            ship.isHit(position)
            if (ship.isSunk()) {
                renderSinkDOM(ship.getCoordinates())
            }


        });
        if (allSunk() == ships.length) {
            console.log('GG')
        }
    }
    const receiveAtk = (position) => {
        position = parseInt(position)

        if (board[position] == 1) {
            board[position] = 'O'
            updateBoard(position, 'hit')
            checkShipHit(position)
            return board
        }
        else {
            board[position] = 'X'
            updateBoard(position, 'miss')
            return board
        }
    }

    const getBoard = () => {
        return board
    }
    const getShips = () => {
        return ships
    }
    const renderShipDOM = (ship) => {
        let coord = ship.getCoordinates()
        coord.forEach(pos => {
            const target = document.getElementById(pos)
            target.style.backgroundColor = 'red'
        });
    }

    const renderSinkDOM = (coordinates) => {
        coordinates.forEach(shipUnit => {
            const target = document.getElementById(shipUnit)
            target.style.backgroundColor = 'black'
        });
    }

    const updateBoard = (pos, type) => {
        let target = document.getElementById(pos)
        if (type === 'hit')
            target.style.backgroundColor = 'green'
        if (type === 'miss')
            target.style.backgroundColor = 'yellow'

    }

    return { setShip, receiveAtk, getBoard, renderSinkDOM, ships, allSunk, getShips }
}




const player = (oponentBoard) => {

    let board = oponentBoard.getBoard()
    const placeAtk = (position) => {
        board = oponentBoard.receiveAtk(position)
        // console.log(oponentBoard.ships)
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
    // random attack for Computer
    const randomAtk = () => {
        const validAtks = getValidAtks(board)
        return validAtks[Math.floor(Math.random() * validAtks.length)]
    }

    return { placeAtk, getValidAtks, randomAtk }
}



export { ship, gameboard, player }