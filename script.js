
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
    // let prevHit = false
    let gameover = false
    const setShip = (ship) => {
        ships.push(ship)
        renderShipDOM(ship)

        let coord = ship.getCoordinates()
        coord.forEach(item => {
            board[item] = 1
        });

        return board
    }
    const newBoard = () => {
        ships.forEach(ship => {
            let coord = ship.getCoordinates()
            coord.forEach(pos => {
                const target = document.getElementById(pos)
                target.style.backgroundColor = '#fafafa'
            });
        });
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
            gameover = true
        }
    }
    const isGameOver = () => {
        return gameover
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
            target.style.backgroundColor = '#bae6fd'
        });
    }

    const renderSinkDOM = (coordinates) => {
        coordinates.forEach(shipUnit => {
            const target = document.getElementById(shipUnit)
            target.style.backgroundColor = '#57534e'
        });
    }

    const updateBoard = (pos, type) => {
        let target = document.getElementById(pos)
        if (type === 'hit') {
            target.style.backgroundColor = '#ef4444'
            // prevHit = pos
        }
        if (type === 'miss') {
            target.style.backgroundColor = '#16a34a'
            // prevHit = false
        }

    }

    return { setShip, receiveAtk, getBoard, ships, allSunk, getShips, newBoard, isGameOver }
}




const player = (oponentBoard) => {
    let prevHit = false
    let board = oponentBoard.getBoard()
    const placeAtk = (position) => {
        board = oponentBoard.receiveAtk(position)
        if (board[position] == 'O')
            prevHit = position
        else {
            prevHit = false
        }
    }


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
    const smartAtk = (prevHit, validAtks) => {
        let next = (validAtks.indexOf(prevHit + 1))
        if (!next) {
            return smartAtk((prevHit + 2))
        }
        return next
    }
    // random attack for Computer
    const randomAtk = () => {
        const validAtks = getValidAtks(board)
        //If previous attack was success,next attack will be next to previous attack coordiante
        if (prevHit) {
            let next = (validAtks.indexOf(prevHit + 1))
            if (next == -1) {
                return validAtks[Math.floor(Math.random() * validAtks.length)]
            }

            return validAtks[next]
        }
        return validAtks[Math.floor(Math.random() * validAtks.length)]
    }

    return { placeAtk, getValidAtks, randomAtk }
}



export { ship, gameboard, player }